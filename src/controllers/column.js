const { HttpCode } = require("../constants/constants");
const columnRepository = require("../repositories/column");

const getAllColumns = async (req, res, next) => {
  try {
    const columns = await columnRepository.getAllColumns();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { columns },
    });
  } catch (error) {
    next(error);
  }
};

const getColumnsByOwnerId = async (req, res, next) => {
  try {
    const columns = await columnRepository.getColumnsByOwnerId(
      req.params.boardId
    );

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { columns },
    });
  } catch (error) {
    next(error);
  }
};

const addColumn = async (req, res, next) => {
  try {
    const column = await columnRepository.addColumn(
      req.params.boardId,
      req.body
    );

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { column },
    });
  } catch (error) {
    next(error);
  }
};

const removeColumn = async (req, res, next) => {
  try {
    await columnRepository.removeColumn(req.params.columnId);

    res.status(HttpCode.NO_CONTENT).json({
      status: "success",
      code: HttpCode.NO_CONTENT,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllColumns,
  getColumnsByOwnerId,
  addColumn,
  removeColumn,
};
