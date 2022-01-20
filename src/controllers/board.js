const { HttpCode } = require("../constants/constants");
const boardRepository = require("../repositories/board");

const createBoard = async (req, res, next) => {
  try {
    const board = await boardRepository.createBoard(req.body);

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { board },
    });
  } catch (error) {
    next(error);
  }
};

const getAllBoards = async (_req, res, next) => {
  try {
    const boards = await boardRepository.getAllBoards();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { boards },
    });
  } catch (error) {
    next(error);
  }
};

const getBoardById = async (req, res, next) => {
  try {
    const board = await boardRepository.getById(req.params.boardId);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { board },
    });
  } catch (error) {
    next(error);
  }
};

const addColumn = async (req, res, next) => {
  try {
    const boards = await boardRepository.addColumn(
      req.params.boardId,
      req.body
    );

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { boards },
    });
  } catch (error) {
    next(error);
  }
};

const removeColumn = async (req, res, next) => {
  try {
    const boards = await boardRepository.removeColumn(
      req.params.boardId,
      req.params.columnId
    );

    res.status(HttpCode.NO_CONTENT).json({
      status: "success",
      code: HttpCode.NO_CONTENT,
      data: { boards },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  addColumn,
  removeColumn,
};
