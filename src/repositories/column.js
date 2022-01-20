const Column = require("../model/schema-column");
const boardRepository = require("../repositories/board");
const Card = require("../model/schema-card");

const getAllColumns = async () => {
  const columns = await Column.find({}); //.populate({path: "owner", select: "title"});
  return columns;
};

const getColumnsByOwnerId = async (boardId) => {
  const columns = await Column.find({ owner: boardId }); //.populate({path: "owner", select: "title"});
  return columns;
};

const addColumn = async (boardId, body) => {
  const column = await Column.create({ owner: boardId, ...body });
  await boardRepository.addColumn(boardId, column._id);
  return column;
};

const removeColumn = async (columnId) => {
  const column = await Column.findByIdAndRemove(columnId);
  await boardRepository.removeColumn(column.owner, columnId);
  await Card.deleteMany({ owner: columnId });
  return column;
};

const addCard = async (columnId, cardId) => {
  const column = await Column.updateOne(
    { _id: columnId },
    { $push: { cards: { cardId } } }
  );
  return column;
};

const removeCard = async (columnId, cardId) => {
  const column = await Column.findById(columnId);

  const deletedCard = column.cards.filter(
    (card) => String(card.cardId) !== cardId
  );

  return await Column.updateOne(
    { _id: columnId },
    { $set: { cards: deletedCard } }
  );
};

module.exports = {
  getAllColumns,
  getColumnsByOwnerId,
  addColumn,
  removeColumn,
  addCard,
  removeCard,
};
