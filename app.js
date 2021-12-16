const express = require("express");
const app = express();
const { HttpCode } = require("./helpers/constants");
const db = require("./model/db");

const PORT = 8050;

const todosRouter = require("./routes/api-todos");

app.use(express.json({ limit: 10000 }));

app.use("/api/todos", todosRouter);

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

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch((e) => {
  console.log(`Error: ${e.message}`);
});
