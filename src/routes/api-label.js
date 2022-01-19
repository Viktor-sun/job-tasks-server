const express = require("express");
const router = express.Router();
const controllers = require("../controllers/label");
const guard = require("../helpers/guard");

router
  .get("/", guard, controllers.getAllLables)
  .get("/:boardId", guard, controllers.getLablesByOwnerId)
  .post("/:boardId", guard, controllers.addLabel);

module.exports = router;
