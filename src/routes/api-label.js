const express = require("express");
const router = express.Router();
const controllers = require("../controllers/label");

router
  .get("/", controllers.getAllLables)
  .post("/:boardId", controllers.addLabel);

module.exports = router;
