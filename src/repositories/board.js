const Board = require("../model/schema-board");

const createBoard = async (body) => {
  const board = await Board.create(body);
  return board;
};

const getAllBoards = async () => {
  const boards = await Board.find({});
  return boards;
};

const getById = async (id) => {
  const boards = await Board.findById(id);
  return boards;
};

const addColumn = async (boardId, columnId) => {
  const board = await Board.updateOne(
    { _id: boardId },
    { $push: { columns: { columnId } } }
  );
  return board;
};

const removeColumn = async (boardId, columnId) => {
  const board = await Board.findById(boardId);

  const deletedColumn = board.columns.filter(
    (column) => String(column.columnId) !== columnId
  );

  return await Board.updateOne(
    { _id: boardId },
    { $set: { columns: deletedColumn } }
  );
};

const addLabel = async (boardId, labelId) => {
  const board = await Board.updateOne(
    { _id: boardId },
    { $push: { labels: { labelId } } }
  );
  return board;
};

module.exports = {
  createBoard,
  getAllBoards,
  getById,
  addColumn,
  removeColumn,
  addLabel,
};
