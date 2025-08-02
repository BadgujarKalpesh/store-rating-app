const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

exports.signup = (req, res) => {
  // Validate password
  const password = req.body.password;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).send({
      message: "Password must be 8-16 characters, with at least one uppercase letter and one special character."
    });
  }

  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    address: req.body.address,
    role: req.body.role || 'Normal User'
  })
  .then(user => {
    res.send({ message: "User registered successfully!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
