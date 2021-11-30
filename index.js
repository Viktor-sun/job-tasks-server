const http = require("http");
const url = require("url");

let todos = [
  { id: 1, todo: "asd" },
  { id: 2, todo: "asdas" },
];

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Headers": "origin, content-type, accept",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PATCH, DELETE",
    // "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  // if (["GET", "POST", "PATCH", "DELETE"].indexOf(req.method) > -1) {
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

    if (hasTodo) {
      res.writeHead(204, "todo deleted", headers);
      todos = todos.filter((todo) => todo.id !== todoId);
      res.end();
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
  } else if (todoId && req.method === "PATCH") {
    const hasTodo = todos.find((todo) => todo.id === todoId);

    if (hasTodo) {
      req.on("data", (data) => {
        res.writeHead(200, headers);
        const { updatedTodo } = JSON.parse(data);

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
  // return;
  // }

  // res.writeHead(405, headers);
  // res.end(`${req.method} is not allowed for the request.`);
});

const PORT = 8050;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
