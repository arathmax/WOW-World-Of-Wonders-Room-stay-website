const express = require("express");
const adminSchema = require("../models/Admin");

const mongoose = require("mongoose");
const router = express.Router();

const Administrator = mongoose.model("admins", adminSchema);

router.post("/", (req, res) => {
  const errors = [];

  //validate

  if (req.body.username === "") {
    errors.push("You must enter a username");
  }

  if (req.body.password === "") {
    errors.push("You must enter password");
  }

  //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
  if (errors.length > 0) {
    res.render("Admin/adminlogin", {
      errors: errors,
      username: req.body.username
    });
  } else {
    Administrator.findOne({ username: req.body.username }).then(user => {
      //user!=null, means that an actual user object was returned
      if (user != null) {
        req.session.userInfo = user;
        console.log("User is logged in");
        res.redirect("/admin_page");
      }

      //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
      else {
        errors.push("You entered the incorrect username / password");
        res.render("Admin/adminlogin", {
          errors: errors,
          username: req.body.username
        });
      }
    });
  }
});

module.exports = router;
