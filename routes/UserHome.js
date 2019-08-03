const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.render("Home/homeuser");
});

module.exports = router;
