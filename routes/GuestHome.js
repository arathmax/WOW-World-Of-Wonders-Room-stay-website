const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("Home/homeguest");
});

router.get("/user", (req, res) => {
  res.render("Home/homeuser");
});

router.get("/user_signup", (req, res) => {
  res.render("User/usersignup");
});

router.get("/user", (req, res) => {
  res.render("Home/homeuser");
});

router.get("/admin_login", (req, res) => {
  res.render("Admin/adminlogin");
});

module.exports = router;
