const { HttpCode } = require("../constants/constants");
const labelRepository = require("../repositories/label");

const getAllLables = async (req, res, next) => {
  try {
    const label = await labelRepository.getAllLables();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { label },
    });
  } catch (error) {
    next(error);
  }
};

const addLabel = async (req, res, next) => {
  try {
    const label = await labelRepository.addLabel(req.params.boardId, req.body);

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { label },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllLables, addLabel };
