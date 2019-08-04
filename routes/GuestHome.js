const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("Home/homeguest");
});

router.get("/user", (req, res) => {
  res.render("Home/homeuser");
});

module.exports = router;
