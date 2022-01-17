const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "1m",
  });
  return { accessToken, refreshToken };
};

module.exports = generateTokens;
