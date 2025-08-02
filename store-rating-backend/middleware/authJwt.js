const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require("../models");
const User = db.users;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === 'System Administrator') {
      next();
      return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
  });
};

const isStoreOwner = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      if (user.role === 'Store Owner') {
        next();
        return;
      }
      res.status(403).send({ message: "Require Store Owner Role!" });
    });
  };

const authJwt = {
  verifyToken,
  isAdmin,
  isStoreOwner
};
module.exports = authJwt;
