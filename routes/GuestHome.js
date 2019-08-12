const express = require("express");
const roomSchema = require("../models/Room");
const mongoose = require("mongoose");
const router = express.Router();

const Rooms = mongoose.model("rooms", roomSchema);

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
router.get("/admin_page", (req, res) => {
  res.render("Admin/roomlist");
});

// GUEST ROOM LIST VIEW
router.post("/guest_room_list", (req, res) => {
  Rooms.find({ city: req.body.selectedCity }).then(room => {
    //user!=null, means that an actual user object was returned

    res.render("Room/guestroomlist", {
      allRooms: room
    });
  });
});

// USER ROOM LIST VIEW
router.post("/user_room_list", (req, res) => {
  Rooms.find({ city: req.body.selectedCity }).then(room => {
    //user!=null, means that an actual user object was returned

    res.render("Room/userroomlist", {
      allRooms: room
    });
  });
});

module.exports = router;
