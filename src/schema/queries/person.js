const { GraphQLNonNull, GraphQLString } = require("graphql");
const { personType } = require("../types");
const { Person } = require("../../models");

const person = {
  type: personType,
  description: "Retrieves a person by name",
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, args) {
    const { firstName, lastName } = args;
    return Person.findOne({ firstName, lastName });
  }
};

module.exports = person;
