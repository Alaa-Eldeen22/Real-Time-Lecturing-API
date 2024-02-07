const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: { type: String },
  students: [{ type: Schema.Types.Object, ref: "User" }],
});

module.exports = mongoose.model("Subject", subjectSchema);
