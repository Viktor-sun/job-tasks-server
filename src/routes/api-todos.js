const express = require("express");
const router = express.Router();
const controllers = require("../controllers/todos");

router
  .get("/", controllers.getAll)
  .post("/", controllers.add)
  .delete("/:todoId", controllers.remove)
  .patch("/:todoId", controllers.update)
  .post("/select", controllers.select)
  .post("/unselect", controllers.unselect)
  .post("/clear", controllers.removeCompleted);

module.exports = router;
