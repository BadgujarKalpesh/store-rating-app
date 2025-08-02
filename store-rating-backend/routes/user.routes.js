const authJwt  = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // --- Admin User Management Routes ---
  app.get(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );

  app.post(
    "/api/admin/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createUser
  );

   // Route for a logged-in user to update their password
  app.put(
    "/api/user/password",
    [authJwt.verifyToken], // Ensures only logged-in users can access
    controller.updatePassword
  );
};
