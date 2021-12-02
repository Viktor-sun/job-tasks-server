const http = require("http");
const url = require("url");

let todos = [
  { id: 3, todo: "<script></scriptasasf", completed: false },
  { id: 4, todo: "asf", completed: true },
  { id: 5, todo: "asf", completed: false },
];

const server = http.createServer((req, res) => {
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
  const todoId = Number(url.parse(req.url, true).query.todoId);

  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, headers);
    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        todos: todos,
      })
    );
  } else if (req.url === "/todos" && req.method === "POST") {
    req.on("data", (data) => {
      res.writeHead(201, headers);
      todos.push(JSON.parse(data));

      res.end(
        JSON.stringify({
          status: "success",
          code: 201,
          message: "todo added",
          todos,
        })
      );
    });
  } else if (todoId && req.method === "DELETE") {
    const hasTodo = todos.find((todo) => todo.id === todoId);

    if (!hasTodo) {
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
    todos = todos.filter((todo) => todo.id !== todoId);
    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: "todo deleted",
        todos,
      })
    );
  } else if (todoId && req.method === "PATCH") {
    const hasTodo = todos.find((todo) => todo.id === todoId);

    if (hasTodo) {
      req.on("data", (data) => {
        res.writeHead(200, headers);
        const { updatedTodo, select } = JSON.parse(data);

        if (select) {
          todos.forEach((todo) => {
            if (todo.id === todoId) {
              todo.completed = !todo.completed;
            }
          });

          res.end(
            JSON.stringify({
              status: "success",
              code: 200,
              message: "todo select",
              todos,
            })
          );
          return;
        }

        todos = todos.map((todo) => {
          if (todoId === todo.id) {
            todo.todo = updatedTodo;
          }
          return todo;
        });

        res.end(
          JSON.stringify({
            status: "success",
            code: 200,
            message: "todo updated",
            todos,
          })
        );
      });
    } else {
      res.writeHead(404, headers);
      res.end(
        JSON.stringify({
          status: "error",
          code: 404,
          message: "todo not found",
        })
      );
    }
  } else if (req.url === "/todos/select.all" && req.method === "POST") {
    res.writeHead(200, headers);

    todos.map((todo) => (todo.completed = true));

    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: "select all",
        todos,
      })
    );
  } else if (req.url === "/todos/unselect.all" && req.method === "POST") {
    res.writeHead(200, headers);
    todos.map((todo) => (todo.completed = false));

    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: `unselect all`,
        todos,
      })
    );
  } else if (req.url === "/todos/clear.completed" && req.method === "POST") {
    res.writeHead(200, headers);
    todos = todos.filter((todo) => !todo.completed);
    res.end(
      JSON.stringify({
        status: "success",
        code: 200,
        message: "clear completed",
        todos,
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
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
