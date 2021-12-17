const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users");

router.post("/signup", controllers.singup).post("/login", controllers.login);

module.exports = router;
