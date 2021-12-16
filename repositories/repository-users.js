const User = require("../model/schema-users");

const findByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

const signup = async (body) => {
  const user = await new User(body).save();
  return user;
};

// const login = async (body) => {
//   const user = await User.findOne(body);
//   return user;
// };

module.exports = { findByName, signup /*login*/ };
