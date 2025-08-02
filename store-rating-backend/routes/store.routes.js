const authJwt  = require("../middleware/authJwt");
const controller = require("../controllers/store.controller");

// Middleware to make token verification optional
const optionalAuth = (req, res, next) => {
    if (!req.headers['x-access-token']) {
        return next();
    }
    authJwt.verifyToken(req, res, next);
};

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Admin route to get dashboard stats
    app.get("/api/admin/stats", [authJwt.verifyToken, authJwt.isAdmin], controller.getDashboardStats);

    // Public route to get all stores, with optional auth to get user-specific ratings
    app.get("/api/stores", [optionalAuth], controller.getAllStores);

    // Admin route to add a new store
    app.post("/api/stores", [authJwt.verifyToken, authJwt.isAdmin], controller.addStore);

    // Route for a user to submit or update a rating
    app.post("/api/stores/:storeId/rate", [authJwt.verifyToken], controller.submitRating);
    
    // Route for a store owner to get their store's details
    app.get(
        "/api/owner/store",
        [authJwt.verifyToken, authJwt.isStoreOwner],
        controller.getOwnerStoreDetails
    );
};
