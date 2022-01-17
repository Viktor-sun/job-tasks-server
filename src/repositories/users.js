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

const updateRefreshToken = async (userId, refreshToken) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { refreshToken },
    { new: true }
  );
  return user;
};

module.exports = { findByName, findById, create, updateRefreshToken };
