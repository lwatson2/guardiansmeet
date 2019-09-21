const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./routes/users");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
const server = app.listen(PORT, console.log(`server started on ${PORT}`));

app.get("/test", (req, res) => {
  res.json({
    msg: hi
  });
});

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//Routing Config
