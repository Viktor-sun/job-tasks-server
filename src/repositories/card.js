const Card = require("../model/schema-card");
const columnRepository = require("../repositories/column");

const addCard = async (boardId, columnId, body) => {
  console.log("add");
  const card = await Card.create({ boardId, owner: columnId, ...body });
  await columnRepository.addCard(columnId, card._id);
  return card;
};

const getAllCards = async () => {
  const cards = await Card.find({}); //.populate({path: "owner", select: "title"});
  return cards;
};

const getCardsByBoardId = async (boardId) => {
  const cards = await Card.find({ boardId }); //.populate({path: "owner", select: "title"});
  return cards;
};

const getCardById = async (cardId) => {
  const cards = await Card.findById(cardId);
  return cards;
};

const removeCard = async (cardId) => {
  const card = await Card.findByIdAndRemove(cardId);

  await columnRepository.removeCard(card.owner, cardId);
  return card;
};

const editCard = async (cardId, body) => {
  const card = await Card.findByIdAndUpdate(cardId, body, { new: true });
  return card;
};

// const Column = require("../model/schema-column");

// const editFieldOwnerCard = async (cardId, body) => {
//   const card = editCard(cardId, body);

//   // =================
//   const oldCol = Column.findById(oldColumnId);

//   const changeCards = oldCol.cards.filter(
//     (card) => String(card.cardId) !== cardId
//   );
//   changeCards.push(newCardId);

//   await Column.updateOne(
//     { _id: oldColumnId },
//     { $set: { cards: changeCards } }
//   );
//   //=====================
//   const newCol = Column.findById();

//   const changeCards = newCol.cards.filter(
//     (card) => String(card.cardId) !== cardId
//   );
//   changeCards.push(newCardId);

//   await Column.updateOne(
//     { _id: oldColumnId },
//     { $set: { cards: changeCards } }
//   );

//   return card;
// };

module.exports = {
  addCard,
  getAllCards,
  getCardsByBoardId,
  getCardById,
  removeCard,
  editCard,
};
