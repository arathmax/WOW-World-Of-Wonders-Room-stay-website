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
            var nodemailer = require("nodemailer");
            var sgTransport = require("nodemailer-sendgrid-transport");

            // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
            var options = {
              auth: {
                api_user: "Sunnyskp",
                api_key: "sunnykrishnanpillai123"
              }
            };

            var mailer = nodemailer.createTransport(sgTransport(options));

            var email = {
              to: [req.body.email],
              from: "skp2june@gmail.com",
              subject: `Welcome ${
                req.body.firstName
              }, to the World of wonders. Explore the world..!!!`,
              text: `Welcome ${
                req.body.firstName
              }, to the World of wonders. Explore the world..!!!`,
              html: `<b>Welcome ${
                req.body.firstName
              }, to the World of wonders. Explore the world..!!!</b>`
            };

            mailer.sendMail(email, function(err, res) {
              if (err) {
                console.log(err);
              }
              console.log(res);
            });

            const accountSid = "AC7e66a80561656e8fe864f1c583fd08a6";
            const authToken = "d7e089fcd946c736dd91a612096b0970";
            const client = require("twilio")(accountSid, authToken);

            client.messages
              .create({
                body: `WELCOME TO WORLD OF WONDERS ${
                  req.body.firstName
                }. Explore the world..!!!`,
                from: "+17787641238",
                to: "+14377723637"
              })
              .then(message => console.log(message.sid));

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
