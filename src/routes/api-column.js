const express = require("express");
const router = express.Router();
const controllers = require("../controllers/column");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllers.getAllColumns)
  .get("/:boardId", guard, controllers.getColumnsByOwnerId)
  .post("/:boardId", guard, controllers.addColumn)
  .delete("/:columnId", guard, controllers.removeColumn);

module.exports = router;
