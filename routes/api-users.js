const express = require("express");
const router = express.Router();
const contorllers = require("../controllers/controllers-users");

router.post("/signup", contorllers.singup).post("/login", contorllers.login);

module.exports = router;
