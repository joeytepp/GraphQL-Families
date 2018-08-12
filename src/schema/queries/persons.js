const { GraphQLList } = require("graphql");
const { personType } = require("../types");
const { Person } = require("../../models");

const persons = {
  type: GraphQLList(personType),
  description: "Retrieves all people in the db",
  resolve(parentValue, args) {
    return Person.find({});
  }
};

module.exports = persons;
