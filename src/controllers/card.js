const { HttpCode } = require("../constants/constants");
const cardRepository = require("../repositories/card");

const addCard = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    const card = await cardRepository.addCard(boardId, columnId, req.body);

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { card },
    });
  } catch (error) {
    next(error);
  }
};

const getAllCards = async (req, res, next) => {
  try {
    const cards = await cardRepository.getAllCards();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { cards },
    });
  } catch (error) {
    next(error);
  }
};

const getCardsByBoardId = async (req, res, next) => {
  try {
    const cards = await cardRepository.getCardsByBoardId(req.params.boardId);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { cards },
    });
  } catch (error) {
    next(error);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const card = await cardRepository.getCardById(req.params.cardId);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { card },
    });
  } catch (error) {
    next(error);
  }
};

const removeCard = async (req, res, next) => {
  try {
    await cardRepository.removeCard(req.params.cardId);

    res.status(HttpCode.NO_CONTENT).json({
      status: "success",
      code: HttpCode.NO_CONTENT,
    });
  } catch (error) {
    next(error);
  }
};

const editCard = async (req, res, next) => {
  try {
    const card = await cardRepository.editCard(req.params.cardId, req.body);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { card },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCard,
  getAllCards,
  getCardsByBoardId,
  getCardById,
  removeCard,
  editCard,
};
