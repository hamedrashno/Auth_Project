const mongoose = require("mongoose");
const timestapm = require("mongoose-timestamp");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(timestapm); //CreatedOn/ ModifyOn

const User = mongoose.model("User", userSchema);

module.exports = User;
