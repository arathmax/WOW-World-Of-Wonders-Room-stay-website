const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  res.render("Room/guestroomlist");
});
module.exports = router;
