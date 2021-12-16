const bcrypt = require("bcryptjs");
const { HttpCode } = require("../helpers/constants");
const usersRepository = require("../repositories/repository-users");

const singup = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const hasUser = await usersRepository.findByName(name);
    if (hasUser) {
      return next({
        status: HttpCode.CONFLICT,
        message: "Name in use",
      });
    }

    const hash = await bcrypt.hash(password, 8);
    const user = await usersRepository.signup({ name, password: hash });
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

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { singup, login };
