const express = require("express");
const router = express.Router();
const contorllers = require("../controllers/controllers-todos");

router
  .get("/", contorllers.getAll)
  .post("/", contorllers.add)
  .delete("/:todoId", contorllers.remove)
  .patch("/:todoId", contorllers.update)
  .post("/select", contorllers.select)
  .post("/unselect", contorllers.unselect)
  .post("/clear", contorllers.removeCompleted);

module.exports = router;
