const db = require("../models");
const User = db.users;
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

// Admin: Get a list of all users with filtering and sorting
exports.getAllUsers = (req, res) => {
    const { search, sortBy, order } = req.query;
    const whereCondition = search ? {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
        ]
    } : null;

    const sortOrder = sortBy && order ? [[sortBy, order]] : [['name', 'ASC']];

    User.findAll({
        where: whereCondition,
        order: sortOrder,
        attributes: ['id', 'name', 'email', 'address', 'role'] // Exclude password
    })
    .then(users => {
        res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

// Admin: Create a new user (any role)
exports.createUser = (req, res) => {
    const { name, email, password, address, role } = req.body;

    if (!password) {
        return res.status(400).send({ message: "Failed! Password is required." });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send({
        message: "Password must be 8-16 characters, with at least one uppercase letter and one special character."
        });
    }

    User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
        address,
        role
    })
    .then(user => {
        const { password, ...userWithoutPassword } = user.toJSON();
        res.status(201).send({ message: "User created successfully!", user: userWithoutPassword});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
