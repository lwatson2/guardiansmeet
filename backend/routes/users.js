const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const saltRounds = 10;
//Create route to upload image first then send the url back to server
router.post("/register", async (req, res) => {
  let profilePicture;
  const { name, password, age, preference, bio } = req.body;
  const { file } = req.files;
  // Checks if Username already exists
  const user = await User.findOne({ name });
  if (user) {
    res.json({
      err: true,
      msg: "User already exists"
    });
  } else {
    //If name doesn't exist create a new one
    await cloudinary.uploader.upload(
      file.path,
      { transformation: [{ width: 400, height: 400, radius: "max" }] },
      (err, image) => {
        profilePicture = image.url;
      }
    );
    const newuser = new User({
      name,
      password,
      bio,
      preference,
      age,
      profilePicture
    });
    //Create a salt of the password to replace the plain text password to save to the database
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(newuser.password, salt, async (err, hash) => {
        if (err) {
        } else {
          newuser.password = hash;
          await newuser.save();
          res.json({
            isAuthenticated: true
          });
        }
      });
    });
  }
});

module.exports = router;
