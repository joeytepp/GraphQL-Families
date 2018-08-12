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
      args: {
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const { name } = parent;
        const { first, offset } = args;
        return Person.find({ lastName: name })
          .skip(offset)
          .limit(first);
      }
    }
  })
});

module.exports = familyType;
