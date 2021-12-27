const User = require("../model/schema-users");

const findByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

const findById = async (id) => {
  return await User.findById(id);
};

const signup = async (body) => {
  const user = await new User(body).save();
  return user;
};

const login = async (userId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isVerified: true },
    { new: true }
  );
  return user;
};

const logout = async (userId) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { isVerified: false },
    { new: true }
  );
  return user;
};

module.exports = { findByName, findById, signup, login, logout };
