const jwt = require("jsonwebtoken");
require("dotenv").config();
const { HttpCode } = require("../constants/constants");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const guard = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "user unauthorized. Need token",
      });
    }

    const decodedData = jwt.verify(token, JWT_ACCESS_SECRET);
    req.user = decodedData;

    next();
  } catch (error) {
    console.log(error);
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "user unauthorized",
    });
  }
};

module.exports = guard;
