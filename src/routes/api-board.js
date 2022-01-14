const express = require("express");
const router = express.Router();
const controllers = require("../controllers/board");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllers.getAllBoards)
  .post("/", controllers.createBoard)
  .post("/:boardId", controllers.addColumn)
  .delete("/:columnId", controllers.removeColumn);

module.exports = router;
