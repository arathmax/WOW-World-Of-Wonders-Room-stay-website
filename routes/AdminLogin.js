const express = require("express");

const router = express.Router();

router.get("/admin_page", (req, res) => {
  res.render("Admin/roomlist");
});

module.exports = router;
