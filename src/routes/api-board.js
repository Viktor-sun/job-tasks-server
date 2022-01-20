const express = require("express");
const router = express.Router();
const controllers = require("../controllers/board");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllers.getAllBoards)
  .get("/:boardId", guard, controllers.getBoardById)
  .post("/", guard, controllers.createBoard)
  .post("/:boardId", guard, controllers.addColumn)
  .delete("/:columnId", guard, controllers.removeColumn);

module.exports = router;
