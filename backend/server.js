const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const webpush = require("web-push");
require("dotenv").config();
const user = require("./routes/users");

//Server Config
const PORT = process.env.PORT || 5000;
const app = express();
//Middleware
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);
//Routing Config
app.use("/users", user);
