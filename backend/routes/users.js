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

// Local Strategy for passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username"
    },
    (username, password, done) => {
      //Match user
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That name is not registered."
            });
          }

          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect." });
            }
          });
        })
        .catch(err => err);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.post("/register", async (req, res) => {
  let profilePicture;
  const { name, password, age, preference, bio, username } = req.body;
  const { file } = req.files;
  console.log(username);
  // Checks if name already exists
  const user = await User.findOne({ username });
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
      profilePicture,
      username
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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // passport uses the local strategy in the /config/passport file
    if (user) {
      // If there's a user sign a jsonwebtoken with their creds and send that back to the client
      jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          res.json({
            token,
            user: {
              name: user.name,
              username: user.username,
              profilePicture: user.profilePicture,
              preference: user.preference,
              age: user.age,
              bio: user.bio,
              id: user._id
            }
          });
        }
      );
    } else {
      res.json({
        err: info
      });
    }
  })(req, res, next);
});

module.exports = router;
