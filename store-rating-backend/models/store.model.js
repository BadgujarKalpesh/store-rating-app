const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Store = sequelize.define("store", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: "Must be a valid email address." } }
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  return Store;
};