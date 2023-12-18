const mongoose = require('mongoose');

const Db = process.env.ATLAS_URI;

const connectToServer = (callback) => {
  mongoose.connect(Db)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      callback(null);
    })
    .catch(err => {
      console.error("Error connecting to MongoDB:", err);
      callback(err);
    });
};

module.exports = { connectToServer };