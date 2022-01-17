const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { HttpCode } = require("./constants/constants");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json({ limit: 10000 }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger(formatsLogger));

app.use("/", require("./routes"));

app.use((_req, res, _next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found!",
    data: "Not Found",
  });
});

app.use((err, _req, res, _next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
  });
});

module.exports = app;
