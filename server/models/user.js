const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  subjects: [{ type: Schema.Types.Object, ref: "Subject" }],
});

module.exports = mongoose.model("User", userSchema);
