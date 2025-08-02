const sequelize = require('../config/database');
const { Sequelize } = require('sequelize');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require("./user.model.js")(sequelize, Sequelize);
db.stores = require("./store.model.js")(sequelize, Sequelize);
db.ratings = require("./rating.model.js")(sequelize, Sequelize);

// --- Define Relationships ---

// User-Rating Relationship: A user can submit many ratings
db.users.hasMany(db.ratings, { as: "ratings" });
db.ratings.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Store-Rating Relationship: A store can have many ratings
db.stores.hasMany(db.ratings, { as: "ratings" });
db.ratings.belongsTo(db.stores, { foreignKey: "storeId", as: "store" });

// User-Store Ownership: A user (Store Owner) can own one store
db.users.hasOne(db.stores, { foreignKey: 'ownerId', as: 'ownedStore' });
db.stores.belongsTo(db.users, { foreignKey: 'ownerId', as: 'owner' });

module.exports = db;
