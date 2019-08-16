const express = require("express");
const roomSchema = require("../models/Room");
const mongoose = require("mongoose");
const router = express.Router();

const Rooms = mongoose.model("rooms", roomSchema);

router.post("/add_room", (req, res) => {
  const errors = [];

  //validate

  if (req.body.title === "") {
    errors.push("You must enter the room title");
  }

  if (req.body.description === "") {
    errors.push("You must enter room description");
  }

  //THERE IS ERROR(S)
  if (errors.length > 0) {
    res.render("Admin/addroom", {
      errors: errors,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
    });
  }

  //NO ERRORS
  else {
    const Room = {
      title: req.body.title,
      description: req.body.description,
      price: req.session.price,
      image: "../public/images/room1.jpg",
      city: req.session.city
    };

    new Rooms(Room)
      .save()
      .then(() => {
        res.redirect("/admin_page");
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  }
});

module.exports = router;
