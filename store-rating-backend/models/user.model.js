const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: { 
        len: {
          args: [3, 60], // Changed min to 3 for practicality
          msg: "Name must be between 3 and 60 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { 
        isEmail: {
          msg: "Must be a valid email address."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: true,
      validate: { 
        len: {
          args: [0, 400],
          msg: "Address must be less than 400 characters."
        }
      }
    },
    role: {
      type: DataTypes.ENUM('System Administrator', 'Normal User', 'Store Owner'),
      defaultValue: 'Normal User',
      allowNull: false
    }
  });
  return User;
};
