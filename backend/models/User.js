const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messageDetails: { type: String },
  sender: { id: String, profilePicture: String },
  timestamp: { type: String },
  viewed: { type: Boolean, default: false }
});
const messageGroupSchema = new mongoose.Schema({
  username: { type: String },
  name: { type: String },
  id: { type: String },
  profilePicture: { type: String },
  messagesList: [{ type: messageSchema }]
});

const matchedSchema = new mongoose.Schema({
  username: { type: String },
  id: { type: String },
  accepted: { type: Boolean, default: false },
  viewed: { type: Boolean, default: false }
});

const sentMatchesSchema = new mongoose.Schema({
  username: { type: String },
  id: { type: String },
  accepted: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  age: { type: String },
  preference: { type: String },
  bio: { type: String },
  profilePicture: { type: String },
  gender: { type: String },
  messages: { type: [messageGroupSchema], default: undefined },
  matched: { type: [matchedSchema], default: undefined },
  sentMatches: { type: [sentMatchesSchema], default: undefined }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
