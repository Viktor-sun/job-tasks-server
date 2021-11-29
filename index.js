const http = require("http");

let todos = [
  { id: 1, todo: "asd" },
  { id: 2, todo: "asd" },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  switch (req.url) {
    case "/":
      res.writeHead(200);

      res.end(
        JSON.stringify({
          status: "success",
          code: 200,
          todos: todos,
        })
      );
      break;

    case "/todos/add":
      req.on("data", (data) => {
        res.writeHead(201);
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
      break;

    case "/todos/delete":
      req.on("data", (todoId) => {
        res.writeHead(200);

        const parsedId = JSON.parse(todoId);

        // const hasTodo = todos.find((todo) => todo.id === parsedId.id);

        todos = todos.filter((todo) => todo.id !== parsedId.id);

        res.end(
          JSON.stringify({
            status: "success",
            code: 200,
            message: "todo deleted",
            todos,
          })
        );
      });
      break;

    case "/todos/update":
      res.writeHead(200);
      req.on("data", (data) => {
        const parsedData = JSON.parse(data);

        todos = todos.map((todo) => {
          if (parsedData.id === todo.id) {
            todo.todo = parsedData.updatedTodo;
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
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
