const express = require("express");
const userSchema = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = mongoose.model("Users", userSchema);
module.exports = router;
router.post("/", (req, res) => {
  const errors = [];

  //validate

  if (req.body.username === "") {
    errors.push("You must enter a username");
  }

  if (req.body.password === "") {
    errors.push("You must enter a last name");
  }

  //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
  if (errors.length > 0) {
    res.render("Home/homeguest", {
      errors: errors,
      username: req.body.username
    });
  } else {
    User.findOne({ username: req.body.username }).then(user => {
      //user!=null, means that an actual user object was returned
      if (user != null) {
        // Load hash from your password DB.
        bcrypt.compare(req.body.password, user.password, function(
          err,
          isMatched
        ) {
          // res === true

          //if isMatched has a true value, that means that the user's password was matched with the has one stored in the db
          if (isMatched == true) {
            req.session.userInfo = user;
            console.log("User is logged in");
            res.redirect("/user");
          }

          //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
          else {
            errors.push("You entered the incorrect password");
            res.render("Home/homeguest", {
              errors: errors,
              username: req.body.username
            });
          }
        });
      }

      //The else represents that the username was not found in the db
      else {
        errors.push("Sorry username does not exists in db");

        res.render("Home/homeguest", {
          errors: errors
        });

        console.log("no user name");
      }
    });
  }
});

// router.get("/logout", (req, res) => {
//   //This kills the session
//   req.session.destroy();
//   res.redirect("/");
// });
