const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./routes/users");
const cloudinary = require("cloudinary").v2;
const formData = require("express-form-data");
const socket = require("socket.io");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(formData.parse());
app.use(express.static(path.join(__dirname, "client", "build")));

//Routing Config
app.use("/users", user);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const server = app.listen(
  process.env.PORT || 5000,
  console.log(`server started on ${PORT}`)
);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//Cloudinary Config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

function getConvoID(id1, id2) {
  return id1 <= id2 ? id1 + ":" + id2 : id2 + ":" + id1;
}

//Socket.io setup
const io = socket(server);

let room;
io.on("connection", socket => {
  socket.on("sendChatRequest", data => {
    socket.broadcast.emit("recievedChatRequest", {
      requestedUser: data.user,
      currentUser: data.clickedUser.username
    });
  });
  socket.on("sendMessage", data => {
    io.sockets.in(data.room).emit("newMessage", {
      messageDetails: data.messageDetails,
      sender: data.sender,
      timestamp: data.timestamp
    });
  });
  socket.on("joinroom", data => {
    if (data.userId && data.connectedUserId) {
      room = getConvoID(data.userId, data.connectedUserId);
      socket.join(room);
      io.in(room).emit("joinedroom", room);
    }
  });
});
