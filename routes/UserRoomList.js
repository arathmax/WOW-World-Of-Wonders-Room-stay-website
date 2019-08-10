const express = require("express");
// const roomSchema = require("../models/Room");
// const mongoose = require("mongoose");
const router = express.Router();

const hasAccess = require("../middleware/auth");

//This creates a model in our application called user. A model is a representation of a collection
// const roomlist = mongoose.model("rooms", roomSchema);

router.get("/", hasAccess, (req, res) => {
  res.render("Room/userroomlist");
});

module.exports = router;
