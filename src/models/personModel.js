const mongoose = require("mongoose");
const uuid = require("uuid");

const personSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  parentIds: {
    type: [String],
    default: []
  },
  childrenIds: {
    type: [String],
    default: []
  },
  siblingIds: {
    type: [String],
    default: []
  }
  //TODO: Add in spouse
});

// First name and last name must be unique
personSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

module.exports = mongoose.model("Person", personSchema);
