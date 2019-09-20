const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const saltRounds = 10;

router.post("/register", (req, res) => {
  const { name, age, bio, preference, password, profilePicture } = req.body;
  //Checks if Username already exists
  User.findOne({ name }).then(user => {
    if (user) {
      res.json({
        err: true,
        msg: "User already exists"
      });
    } else {
      //If name doesn't exist create a new one
      const newuser = new User({
        name,
        password,
        bio,
        preference,
        age,
        profilePicture
      });
      // Create a salt of the password to replace the plain text password to save to the database
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
});
