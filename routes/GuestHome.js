const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("Home/homeguest");
});

// router.get("/admin_login", (req, res) => {
//   res.render("Admin/adminlogin");
// });

module.exports = router;
