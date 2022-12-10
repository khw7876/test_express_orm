const mongoose = require("mongoose");
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  email: String,
  nickname: String,
  password: String,
});
UserSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
UserSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("User", UserSchema);