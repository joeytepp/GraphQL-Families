const { GraphQLNonNull, GraphQLString } = require("graphql");
const { familyType } = require("../types");
const { Person } = require("../../models");

const family = {
  type: familyType,
  description: "Retrieves a family by lastName",
  args: {
    name: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, args) {
    const { name } = args;
    return Person.countDocuments({ lastName: name }).then(res => ({
      name,
      size: res
    }));
  }
};

module.exports = family;
