const bcrypt = require("bcryptjs");
const fun = async () => {
  const encryptedPassword = await bcrypt.hash("password", 10);
  console.log(encryptedPassword);
};
// fun();
const comp = async (s1, s2) => {
  console.log(await bcrypt.compare(s1, s2));
};

const s1 = "$2a$10$/QL6rCuJcROk5/2i2kIiN.FN6VJKywzcHUv1XOpH2l3VO0YarpB4e";
const s2 = "$2a$10$aONfg5JfFg1g.pYk0c9m4O.qnntVRVk7Z8Kxujh8HouNNkHbcaB7m";
const se = "$2a$10$8BOfMF2X4cV2QbyWuxtzoOE1I3mDpIogfN9FYdTmAKUd3G6Btamwa";
comp("password", s1);
comp("password", s2);
comp("password", se);
