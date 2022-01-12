const express = require("express");
const router = express.Router();
const controllers = require("../controllers/board");

router
  .get("/", controllers.getAllBoards)
  .post("/", controllers.createBoard)
  .post("/:boardId/columns", controllers.addColumn)
  .delete("/:boardId/columns/:columnId", controllers.removeColumn);
// .patch("/:todoId", controllers.update)
// .post("/select", controllers.select)
// .post("/unselect", controllers.unselect)
// .post("/clear", controllers.removeCompleted);

module.exports = router;
