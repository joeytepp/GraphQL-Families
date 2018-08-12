const uuid = require("uuid");
const { Person } = require("../models");
const homerId = uuid.v4();
const margeId = uuid.v4();
const bartId = uuid.v4();
const lisaId = uuid.v4();
const maggieId = uuid.v4();

module.exports = () => {
  const homer = new Person({
    _id: homerId,
    firstName: "Homer",
    lastName: "Simpson",
    age: 39,
    childrenIds: [bartId, lisaId, maggieId]
  });

  const marge = new Person({
    _id: margeId,
    firstName: "Marge",
    lastName: "Simpson",
    age: 36,
    childrenIds: [bartId, lisaId, maggieId]
  });

  const bart = new Person({
    _id: bartId,
    firstName: "Bart",
    lastName: "Simpson",
    age: 10,
    parentIds: [margeId, homerId],
    siblingIds: [lisaId, maggieId]
  });

  const lisa = new Person({
    _id: lisaId,
    firstName: "Lisa",
    lastName: "Simpson",
    age: 8,
    parentIds: [margeId, homerId],
    siblingIds: [bartId, maggieId]
  });

  const maggie = new Person({
    _id: maggieId,
    firstName: "Maggie",
    lastName: "Simpson",
    age: 1,
    parentIds: [margeId, homerId],
    siblingIds: [bartId, lisaId]
  });

  return Promise.all([
    homer.save(),
    marge.save(),
    bart.save(),
    lisa.save(),
    maggie.save()
  ]);
};
