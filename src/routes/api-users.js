const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users");

router
  .post("/signup", controllers.singup)
  .post("/login", controllers.login)
  .post("/logout", controllers.logout)
  .get("/current/:userId", controllers.getCurrent);

module.exports = router;
