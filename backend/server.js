const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./routes/users");
const cloudinary = require("cloudinary").v2;
const formData = require("express-form-data");
const socket = require("socket.io");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(formData.parse());
const server = app.listen(5000, console.log(`server started on ${PORT}`));

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//Routing Config
app.use("/users", user);

//Cloudinary Config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

//Socket.io setup
const io = socket(server);

io.on("connection", socket => {
  socket.on("test", data => console.log(data));
  socket.on("sendChatRequest", data => {
    socket.broadcast.emit("recievedChatRequest", {
      requestedUser: data.user.name,
      currentUser: data.clickedUser.username
    });
    console.log(data);
  });
});
