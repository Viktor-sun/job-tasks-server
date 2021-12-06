const http = require("http");
const url = require("url");
const db = require("./model/db");
const Todo = require("./model/schema-todos");

const server = http.createServer(async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "origin, content-type, accept",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PATCH, DELETE",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  res.writeHead(200, headers);
  const todoId = url.parse(req.url, true).query.todoId;

  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, headers);

    const todos = await Todo.find({});
    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        todos,
      })
    );
  } else if (req.url === "/todos" && req.method === "POST") {
    req.on("data", async (data) => {
      res.writeHead(201, headers);
      const todos = await Todo.create(JSON.parse(data));

      res.end(
        JSON.stringify({
          status: "success",
          code: 201,
          message: "todo added",
          data: todos,
        })
      );
    });
  } else if (todoId && req.method === "DELETE") {
    const todo = await Todo.findByIdAndRemove({ _id: todoId });

    if (!todo) {
      res.writeHead(404, headers);
      res.end(
        JSON.stringify({
          status: "error",
          code: 404,
          message: "todo not found",
        })
      );
      return;
    }

    res.writeHead(200, "todo deleted", headers);
    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: "todo deleted",
        todo,
      })
    );
  } else if (todoId && req.method === "PATCH") {
    const getNotFound = () => {
      res.writeHead(404, headers);
      res.end(
        JSON.stringify({
          status: "error",
          code: 404,
          message: "todo not found",
        })
      );
    };

    req.on("data", async (data) => {
      res.writeHead(200, headers);
      const { updatedTodo, select } = JSON.parse(data);

      if (select !== undefined) {
        const todo = await Todo.findOneAndUpdate(
          { _id: todoId },
          { completed: select },
          { new: true }
        );

        if (!todo) {
          getNotFound();
          return;
        }

        res.end(
          JSON.stringify({
            status: "success",
            code: 200,
            message: "todo select",
            todo,
          })
        );
        return;
      }

      const todo = await Todo.findOneAndUpdate(
        { _id: todoId },
        { todo: updatedTodo },
        { new: true }
      );

      if (!todo) {
        getNotFound();
        return;
      }

      res.end(
        JSON.stringify({
          status: "success",
          code: 200,
          message: "todo updated",
          todo,
        })
      );
    });
  } else if (req.url === "/todos/select.all" && req.method === "POST") {
    res.writeHead(200, headers);
    const todo = await Todo.updateMany({}, { completed: true });

    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: "select all",
        todo,
      })
    );
  } else if (req.url === "/todos/unselect.all" && req.method === "POST") {
    res.writeHead(200, headers);
    const todo = await Todo.updateMany({}, { completed: false });

    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: `unselect all`,
        todo,
      })
    );
  } else if (req.url === "/todos/clear.completed" && req.method === "POST") {
    res.writeHead(200, headers);
    const todo = await Todo.deleteMany({ completed: true });

    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: "clear completed",
        todo,
      })
    );
  } else if (!todoId) {
    res.writeHead(400, headers, "bad request");
    res.end(
      JSON.stringify({
        status: "error",
        code: 400,
        message: "bad request",
      })
    );
  } else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

const PORT = 8050;

db.then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((e) => {
  console.log(`Error: ${e.message}`);
});
