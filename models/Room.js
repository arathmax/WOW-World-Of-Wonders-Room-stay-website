/*
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  NumberOfRooms: {
    type: Number,
    required: true
  }
});

module.exports = roomSchema;
