const express = require("express");
const router = express.Router();
const controllers = require("../controllers/board");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllers.getAllBoards)
  .post("/", guard, controllers.createBoard)
  .post("/:boardId", guard, controllers.addColumn)
  .delete("/:columnId", guard, controllers.removeColumn);

module.exports = router;
