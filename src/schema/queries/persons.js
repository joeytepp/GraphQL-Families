const { GraphQLList, GraphQLInt } = require("graphql");
const { personType } = require("../types");
const { Person } = require("../../models");

const persons = {
  type: GraphQLList(personType),
  args: {
    first: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  description: "Retrieves all people in the db",
  resolve(parentValue, args) {
    const { first, offset } = args;
    return Person.find({})
      .skip(offset)
      .limit(first);
  }
};

module.exports = persons;
