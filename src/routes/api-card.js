const express = require("express");
const router = express.Router();
const controllers = require("../controllers/card");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllers.getAllCards)
  .get("/:boardId", guard, controllers.getCardsByBoardId)
  .post("/:boardId/:columnId", guard, controllers.addCard)
  .delete("/:cardId", guard, controllers.removeCard)
  .post("/:cardId/edit", guard, controllers.editCard);

module.exports = router;
