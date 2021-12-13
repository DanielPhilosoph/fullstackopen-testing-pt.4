const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  name: { type: String },
  password: { type: String, required: true, minlength: 3 },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
