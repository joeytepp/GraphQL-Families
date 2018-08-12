const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList
} = require("graphql");
const _ = require("lodash");
const { personType } = require("../types");
const { Person } = require("../../models");

const addRelationship = {
  type: GraphQLList(personType),
  description: "Adds a relationship between two people",
  args: {
    lastName: { type: GraphQLNonNull(GraphQLString) },
    nameA: { type: GraphQLNonNull(GraphQLString) },
    nameB: { type: GraphQLNonNull(GraphQLString) },
    relationship: {
      type: new GraphQLEnumType({
        name: "Relations",
        values: {
          ParentChild: { value: "ParentChild" },
          ChildParent: { value: "ChildParent" },
          Sibling: { value: "Sibling" }
        }
      })
    }
  },
  async resolve(parent, args) {
    // TODO: move this to personModel
    const { lastName, nameA, nameB, relationship } = args;

    if (nameA === nameB) {
      throw new Error("Relationships cannot be the same person!");
    }

    const person1 = await Person.findOne({ firstName: nameA, lastName });
    const person2 = await Person.findOne({ firstName: nameB, lastName });

    if (!person1 || !person2) {
      throw new Error("Could not find both people");
    }

    switch (relationship) {
      case "Sibling":
        table = {};
        table[person1._id] = 1;
        table[person2._id] = 1;
        person1.siblingIds.forEach(i => (table[i] = 1));
        person2.siblingIds.forEach(i => (table[i] = 1));

        return Promise.all(
          Object.keys(table).map(_id => {
            return Person.update(
              { _id },
              { $set: { siblingIds: Object.keys(_.omit(table, _id)) } }
            ).then(() => Person.findById(_id));
          })
        );
      case "ChildParent":
        // TODO: Make this update siblings too
        if (!_.includes(person1.parentIds, person2._id)) {
          person1.parentIds.push(person2._id);
        }
        if (!_.includes(person2.childrenIds, person1._id)) {
          person2.childrenIds.push(person1._id);
        }
        break;
      case "ParentChild":
        // TODO: Make this also update siblings
        if (!_.includes(person1.childrenIds, person2._id)) {
          person1.childrenIds.push(person2._id);
        }
        if (!_.includes(person2.parentIds, person1._id)) {
          person2.parentIds.push(person1._id);
        }
        break;
    }
    return Promise.all([person1.save(), person2.save()]);
  }
};

module.exports = addRelationship;
