const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const { Person } = require("../../models");
const personType = require("./personType");

const familyType = new GraphQLObjectType({
  name: "Family",
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    size: {
      type: GraphQLNonNull(GraphQLInt)
    },
    members: {
      type: GraphQLList(personType),
      resolve(parent, args) {
        const { name } = parent;
        return Person.find({ lastName: name });
      }
    }
  })
});

module.exports = familyType;
