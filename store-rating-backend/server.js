const express = require("express");
const cors = require("cors");
const db = require("./models");
require('dotenv').config();

const app = express();

// cors configuration to allow requests from the React frontend
app.use(cors({ origin: "http://localhost:3000" }));

// middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync database models with the actual database
// Use { force: true } only in development to drop and re-create tables
db.sequelize.sync().then(() => {
  console.log("Database synced successfully.");
  initial();
}).catch(err => {
  console.error("Failed to sync database: " + err.message);
});

function initial() {
  const User = db.users;
  const bcrypt = require("bcryptjs");

  User.findAndCountAll({ where: { role: 'System Administrator' } }).then(({ count }) => {
    if (count === 0) {
      User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("AdminPassword1!", 8), // Use a secure password
        address: "123 Admin St",
        role: "System Administrator"
      });
      console.log("Created initial System Administrator account.");
    }
  });
}


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Store Rater API." });
});


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/store.routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
