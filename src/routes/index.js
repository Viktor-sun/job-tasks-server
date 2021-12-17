const express = require("express");
const router = express.Router();

router.use("/api/todos", require("./api-todos"));
router.use("/api/users", require("./api-users"));

module.exports = router;
