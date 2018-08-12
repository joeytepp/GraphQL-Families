const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
const { personType } = require("../types");
const { Person } = require("../../models");

const addPerson = {
  type: personType,
  description: "Creates a new person",
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) }
  },
  resolve(parentValue, args) {
    const { firstName, lastName, age } = args;
    return new Person({ firstName, lastName, age }).save();
  }
};

module.exports = addPerson;
