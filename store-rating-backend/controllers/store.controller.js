const db = require("../models");
const Store = db.stores;
const Rating = db.ratings;
const User = db.users;
const { Sequelize, Op } = require('sequelize');

// Admin: Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.count();
        const storeCount = await Store.count();
        const ratingCount = await Rating.count();
        res.status(200).send({ userCount, storeCount, ratingCount });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Public: Get all stores with filtering, sorting, and user-specific ratings
exports.getAllStores = async (req, res) => {
    const { search, sortBy, order } = req.query;
    const userId = req.userId; // This will be undefined if the user is not logged in

    const whereCondition = search ? {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } }
        ]
    } : null;

    const sortOrder = sortBy && order ? [[sortBy, order]] : [['name', 'ASC']];

    try {
        const stores = await Store.findAll({
            where: whereCondition,
            order: sortOrder
        });

        const storesWithDetails = await Promise.all(
            stores.map(async (store) => {
                const avgRatingResult = await Rating.findOne({
                    where: { storeId: store.id },
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']],
                    raw: true
                });

                let userRatingResult = null;
                if (userId) { // Only check for user's rating if they are logged in
                    userRatingResult = await Rating.findOne({
                        where: { storeId: store.id, userId: userId },
                        attributes: ['rating'],
                        raw: true
                    });
                }

                return {
                    ...store.toJSON(),
                    averageRating: avgRatingResult.averageRating ? parseFloat(avgRatingResult.averageRating) : null,
                    userRating: userRatingResult ? userRatingResult.rating : null
                };
            })
        );

        res.status(200).send(storesWithDetails);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// Admin: Add a new store
exports.addStore = (req, res) => {
    const ownerId = req.body.ownerId === "" ? null : req.body.ownerId;
    Store.create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        ownerId: ownerId
    })
    .then(store => {
        res.status(201).send({ message: "Store created successfully!", store });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Authenticated User: Submit or update a rating for a store
exports.submitRating = (req, res) => {
    const storeId = req.params.storeId;
    const userId = req.userId;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).send({ message: "Rating must be between 1 and 5." });
    }

    Rating.findOne({ where: { userId, storeId } })
    .then(existingRating => {
        if (existingRating) {
            existingRating.rating = rating;
            return existingRating.save();
        } else {
            return Rating.create({ rating, userId, storeId });
        }
    })
    .then(savedRating => {
        res.status(200).send({ message: "Rating submitted successfully!", rating: savedRating });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Store Owner: Get details and ratings for their specific store
exports.getOwnerStoreDetails = async (req, res) => {
    try {
        const ownerId = req.userId;

        // 1. Find ALL stores owned by the user.
        const stores = await Store.findAll({ where: { ownerId: ownerId } });

        // If the owner has no stores, send back an empty array.
        if (!stores || stores.length === 0) {
            return res.status(200).send([]);
        }

        // 2. For each store, fetch its details (avg rating and individual ratings).
        const detailedStores = await Promise.all(
            stores.map(async (store) => {
                // Get average rating for this specific store
                const avgRatingResult = await Rating.findOne({
                    where: { storeId: store.id },
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']],
                    raw: true
                });

                // Get the list of all individual ratings for this specific store
                const ratingsList = await Rating.findAll({
                    where: { storeId: store.id },
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'email']
                    },
                    order: [['createdAt', 'DESC']]
                });

                // 3. Combine all data for this store into a single object.
                return {
                    ...store.toJSON(),
                    averageRating: avgRatingResult.averageRating ? parseFloat(avgRatingResult.averageRating) : null,
                    ratings: ratingsList
                };
            })
        );

        // 4. Send the array of detailed store objects to the frontend.
        res.status(200).send(detailedStores);

    } catch (err) {
        console.error("Error fetching owner store details:", err);
        res.status(500).send({ message: err.message });
    }
};

