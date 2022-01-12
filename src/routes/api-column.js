const express = require("express");
const router = express.Router();
const controllers = require("../controllers/column");

router
  .get("/", controllers.getAllColumns)
  .post("/:boardId", controllers.addColumn)
  .delete("/:columnId", controllers.removeColumn);

module.exports = router;
