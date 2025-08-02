const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rating = sequelize.define("rating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        min: {
          args: [1],
          msg: "Rating must be at least 1."
        },
        max: {
          args: [5],
          msg: "Rating must be at most 5."
        }
      }
    }
  });
  return Rating;
};
