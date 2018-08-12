const { GraphQLObjectType } = require("graphql");

const family = require("./family");
const person = require("./person");
const persons = require("./persons");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    family,
    person,
    persons
  })
});
