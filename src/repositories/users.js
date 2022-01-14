const User = require("../model/schema-users");

const findByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

const findById = async (id) => {
  return await User.findById(id);
};

const create = async (body) => {
  const user = await new User(body).save();
  return user;
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

module.exports = { findByName, findById, create, updateToken };
