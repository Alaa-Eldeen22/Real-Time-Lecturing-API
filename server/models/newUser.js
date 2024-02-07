const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newUserSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  verificationCode: { type: String },
});

module.exports = mongoose.model("newUser", newUserSchema);
