const mongoose = require("mongoose");
const { Person } = require("../models");
const seedDB = require("./seed");

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI);

module.exports = new Promise((resolve, reject) => {
  Person.countDocuments({}).then(res => {
    if (!res) {
      seedDB().then(() => resolve());
    } else {
      resolve();
    }
  });
});
// new Person({ firstName: "Joey", lastName: "Tepperman", age: 20 })
//   .save()
//   .then(() => console.log("Saved Joey"));
