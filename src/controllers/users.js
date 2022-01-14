const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpCode } = require("../constants/constants");
const usersRepository = require("../repositories/users");
const generateTokens = require("../helpers/generateTokens");
require("dotenv").config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const singup = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const hasUser = await usersRepository.findByName(name);
    if (hasUser) {
      return next({
        status: HttpCode.CONFLICT,
        message: "Name in use",
      });
    }

    const hash = await bcrypt.hash(password, 8);
    const user = await usersRepository.create({ name, password: hash });

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await usersRepository.findByName(req.body.name);
    const isValidPass =
      user && (await bcrypt.compare(req.body.password, user.password));

    if (!isValidPass) {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: "Name or password is wrong",
      });
    }

    const payload = { userId: user._id };
    const { accessToken, refreshToken } = generateTokens(payload);
    // res.cookie()
    await usersRepository.updateRefreshToken(user._id, refreshToken);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { name: user.name, accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // delete res.cookie();
    await usersRepository.updateRefreshToken(userId, null);

    res.status(HttpCode.NO_CONTENT).json({
      status: "success",
      code: HttpCode.NO_CONTENT,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await usersRepository.findById(userId);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const token = req.cookies;
  const token = req.body.refreshToken;
  let tokenData = null;
  try {
    tokenData = jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "token expired!",
      });
    }

    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "invalid token",
      });
    }
  }

  const payload = { userId: tokenData._id };
  const { accessToken, refreshToken } = generateTokens(payload);

  await usersRepository.updateRefreshToken(tokenData._id, refreshToken);

  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { accessToken, refreshToken },
  });
};

module.exports = { singup, login, logout, getCurrent, refreshToken };
