const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  viewed: { type: Boolean, default: false },
  name: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  age: { type: String },
  preference: { type: String },
  bio: { type: String },
  profilePicture: { type: String },
  notifications: { type: [notificationSchema], default: undefined }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
