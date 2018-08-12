const { GraphQLObjectType } = require("graphql");

const addPerson = require("./addPerson");
const addRelationship = require("./addRelationship");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPerson,
    addRelationship
  }
});
