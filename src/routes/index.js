const express = require("express");
const router = express.Router();

router.use("/api/board", require("./api-board"));
router.use("/api/columns", require("./api-column"));
router.use("/api/cards", require("./api-card"));
router.use("/api/labels", require("./api-label"));
router.use("/api/users", require("./api-users"));

module.exports = router;
