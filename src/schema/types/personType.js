const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require("graphql");
const _ = require("lodash");

const { Person } = require("../../models");

const personType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    _id: {
      type: GraphQLNonNull(GraphQLString)
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString)
    },
    age: {
      type: GraphQLNonNull(GraphQLInt)
    },
    parentIds: {
      type: GraphQLList(GraphQLString)
    },
    childrenIds: {
      type: GraphQLList(GraphQLString)
    },
    siblingIds: {
      type: GraphQLList(GraphQLString)
    },
    siblings: {
      type: GraphQLList(personType),
      resolve(parent, args) {
        const { siblingIds } = parent;
        return _.isEmpty(siblingIds)
          ? []
          : Promise.all(siblingIds.map(i => Person.findById(i)));
      }
    },
    parents: {
      type: GraphQLList(personType),
      resolve(parent, args) {
        const { parentIds } = parent;
        return _.isEmpty(parentIds)
          ? []
          : Promise.all(parentIds.map(i => Person.findById(i)));
      }
    },
    children: {
      type: GraphQLList(personType),
      resolve(parent, args) {
        const { childrenIds } = parent;
        return _.isEmpty(childrenIds)
          ? []
          : Promise.all(childrenIds.map(i => Person.findById(i)));
      }
    }
  })
});

module.exports = personType;
