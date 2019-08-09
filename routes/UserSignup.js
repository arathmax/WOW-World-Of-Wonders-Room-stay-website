const express = require("express");
const userSchema = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
//This creates a model in our application called user. A model is a representation of a collection
const User = mongoose.model("Users", userSchema);

router.get("/", (req, res) => {
  res.render("Home/homeguest");
});

router.get("/user_signup", (req, res) => {
  res.render("User/usersignup");
});

router.post("/", (req, res) => {
  const errors = [];

  //validate

  if (req.body.firstName === "") {
    errors.push("You must enter a first name");
  }

  if (req.body.lastName === "") {
    errors.push("You must enter a last name");
  }

  if (req.body.username === "") {
    errors.push("You must enter a username");
  }

  if (req.body.password === "") {
    errors.push("You must enter a password");
  }

  if (req.body.cpassword === "") {
    errors.push("You must re-enter password");
  }

  if (req.body.email === "") {
    errors.push("You must enter your email address");
  }

  if (req.body.telephone === "") {
    errors.push("You must enter your contact number");
  }

  if (req.body.password !== "" && req.body.cpassword !== "") {
    if (req.body.password != req.body.cpassword) {
      errors.push("The password and confirm was not equal");
    }
  }

  //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
  if (errors.length > 0) {
    res.render("User/usersignup", {
      errors: errors,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      telephone: req.body.telephone,
      email: req.body.telephone
    });
  } else {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      telephone: req.body.telephone
    };

    //The genSalt function is used to generate random Text that will then be added to your password. Then that new, edited password will be hash
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(userData.password, salt, function(err, hash) {
        userData.password = hash;

        new User(userData)
          .save()
          .then(() => {
            res.redirect("/");
          })
          .catch(err => {
            console.log(`Error ${err}`);
          });
      });
    });
  }
});
module.exports = router;
