const Card = require("../model/schema-card");
const columnRepository = require("../repositories/column");

const addCard = async (columnId, body) => {
  const card = await Card.create({ owner: columnId, ...body });
  await columnRepository.addCard(columnId, card._id);
  return card;
};

const getAllCards = async () => {
  const cards = await Card.find({}); //.populate({path: "owner", select: "title"});
  return cards;
};

const removeCard = async (cardId) => {
  const card = await Card.findByIdAndRemove(cardId);

  await columnRepository.removeCard(card.owner, cardId);
  return card;
};

module.exports = {
  addCard,
  getAllCards,
  removeCard,
};
