const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { verifyToken } = require("../config/jwt");

const saltRounds = 10;
// Use  db.students.find().skip(20).limit(20) for fetching more users
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
              message: "That username is not registered."
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

router.get("/userList", async (req, res) => {
  const count = await User.countDocuments();
  res.json({
    count
  });
});

router.post("/register", async (req, res) => {
  const { name, password, age, preference, bio, username } = req.body;
  const { file } = req.files;
  let profilePicture;
  // Checks if name already exists
  const user = await User.findOne({ username });
  if (user) {
    res.json({
      err: true,
      msg: "Username already exists"
    });
  } else {
    //If name doesn't exist create a new one
    if (req.body.profilePicture) {
      await cloudinary.uploader.upload(
        file.path,
        { transformation: [{ width: 400, height: 400, radius: "max" }] },
        (err, image) => {
          profilePicture = image.url;
        }
      );
    } else {
      profilePicture = null;
    }
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
          res.json({ err });
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
        { id: user._id },
        process.env.SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            res.json({
              err
            });
          }
          res.json({
            token,
            user: {
              name: user.name,
              username: user.username,
              profilePicture: user.profilePicture,
              preference: user.preference,
              age: user.age,
              bio: user.bio,
              id: user._id,
              matched: user.matched,
              sentMatches: user.sentMatches
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

router.post("/handleMatchedUser", verifyToken, async (req, res) => {
  const { user, clickedUser } = req.body;
  await User.findOneAndUpdate(
    { _id: clickedUser._id, "matched.username": { $ne: user.username } },
    {
      $push: {
        matched: { username: user.username, id: user.id },
        viewed: false
      }
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.sendStatus(200);
});

router.get("/fetchUserProfile", verifyToken, async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET);
  const { id } = decoded;
  const userProfile = await User.findOne({ _id: id });
  res.json({
    userProfile: {
      name: userProfile.name,
      username: userProfile.username,
      profilePicture: userProfile.profilePicture,
      preference: userProfile.preference,
      age: userProfile.age,
      bio: userProfile.bio,
      id: userProfile._id,
      matched: userProfile.matched,
      sentMatches: userProfile.sentMatches
    }
  });
});
router.get("/fetchMatchedUserDetails", verifyToken, async (req, res) => {
  let username = req.query.username;
  const user = await User.findOne({ username });
  res.json({
    user: {
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      preference: user.preference,
      age: user.age,
      bio: user.bio
    }
  });
});
router.post("/updateSentMatches", verifyToken, async (req, res) => {
  const { user, clickedUser } = req.body;
  console.log(req.body);
  await User.findOneAndUpdate(
    { _id: user.id, "sentMatches.username": { $ne: clickedUser.username } },
    {
      $push: {
        sentMatches: { username: clickedUser.username, id: clickedUser._id }
      }
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log(doc);
    }
  );
  res.sendStatus(200);
});
router.post("/setViewedMatched", verifyToken, async (req, res) => {
  const { user, id } = req.body;
  const userProfile = await User.findOne({ _id: user.id });
  userProfile.matched.forEach(match => {
    if (match.viewed === false && match.id === id) {
      match.viewed = true;
    }
  });
  await userProfile.save();
  res.sendStatus(200);
});
router.get("/fetchusers", async (req, res) => {
  let offset = req.query.offset;
  let username = req.query.username;
  let users;
  let matchedIds = [];
  offset = parseInt(offset);
  if (username) {
    const user = await User.findOne({ username: username });
    if (user.matched) {
      user.matched.forEach(match => {
        matchedIds.push(match.id);
      });
    }
    users = await User.find(
      {
        username: { $ne: username },
        _id: { $nin: matchedIds }
      },
      { password: 0 }
    )
      .skip(offset)
      .limit(2);
  } else {
    users = await User.find({}, { password: 0 })
      .skip(offset)
      .limit(2);
  }
  res.json({ users });
});
router.get("/refreshUser", async (req, res) => {
  let id = req.query.id;
  const user = await User.findOne({ _id: id });
  res.json({
    user: {
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      preference: user.preference,
      age: user.age,
      bio: user.bio,
      id: user._id,
      matched: user.matched,
      sentMatches: user.sentMatches
    }
  });
});
router.post("/acceptMatchRequest", verifyToken, async (req, res) => {
  const { user, requestedUser } = req.body;
  const userProfile = await User.findOne({ _id: user.id });

  userProfile.matched.forEach(match => {
    if (match.username === requestedUser.username) {
      match.accepted = true;
    }
  });
  await userProfile.save();
  res.sendStatus(200);
});
router.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

module.exports = router;
