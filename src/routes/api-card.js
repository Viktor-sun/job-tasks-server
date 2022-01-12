const express = require("express");
const router = express.Router();
const controllers = require("../controllers/card");

router
  .get("/", controllers.getAllCards)
  .post("/:columnId", controllers.addCard)
  .delete("/:cardId", controllers.removeCard);

module.exports = router;
