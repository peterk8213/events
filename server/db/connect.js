const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch(() => {
      console.error("MongoDB connection failed");
    });
};

module.exports = connectDB;
