const mongoose = require("mongoose");
const { Person } = require("../models");
const seedDB = require("./seed");

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/families");

module.exports = new Promise((resolve, reject) => {
  Person.countDocuments({}).then(res => {
    if (!res) {
      seedDB().then(() => resolve());
    } else {
      resolve();
    }
  });
});
