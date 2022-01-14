const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users");
const guard = require("../helpers/guard");

router
  .post("/signup", controllers.singup)
  .post("/login", controllers.login)
  .post("/logout", guard, controllers.logout)
  .get("/current", guard, controllers.getCurrent)
  .post("/refresh", controllers.refreshToken);

module.exports = router;
