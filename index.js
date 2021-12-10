const http = require("http");
const url = require("url");
const db = require("./model/db");
const Todo = require("./model/schema-todos");
const User = require("./model/schema-users");
const { HttpCode } = require("./helpers/constants");

const server = http.createServer(async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "origin, content-type, accept",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PATCH, DELETE",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(HttpCode.NO_CONTENT, headers);
    res.end();
    return;
  }

  res.writeHead(HttpCode.OK, headers);
  const todoId = url.parse(req.url, true).query.todoId;

  if (req.url === "/todos" && req.method === "GET") {
    req.on("data", async (data) => {
      try {
        res.writeHead(HttpCode.OK, headers);

        const todos = await Todo.find({
          owner: JSON.parse(data).id,
        }).populate({ path: "owner", select: "_id name" });

        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            todos,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  } else if (req.url === "/todos" && req.method === "POST") {
    try {
      req.on("data", async (data) => {
        res.writeHead(HttpCode.CREATED, "todo added", headers);

        const todos = await Todo.create(JSON.parse(data));

        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.CREATED,
            message: "todo added",
            data: todos,
          })
        );
      });
    } catch (error) {
      res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
      res.end(error);
    }
  } else if (todoId && req.method === "DELETE") {
    req.on("data", async (data) => {
      try {
        const todo = await Todo.findByIdAndRemove({
          _id: todoId,
          ...JSON.parse(data),
        });

        if (!todo) {
          res.writeHead(HttpCode.NOT_FOUND, headers);
          res.end(
            JSON.stringify({
              status: "error",
              code: HttpCode.NOT_FOUND,
              message: "todo not found",
            })
          );
          return;
        }

        res.writeHead(HttpCode.OK, "todo deleted", headers);
        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "todo deleted",
            todo,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  } else if (todoId && req.method === "PATCH") {
    const getNotFound = () => {
      res.writeHead(HttpCode.NOT_FOUND, "todo not found", headers);
      res.end(
        JSON.stringify({
          status: "error",
          code: HttpCode.NOT_FOUND,
          message: "todo not found",
        })
      );
    };
    try {
      req.on("data", async (data) => {
        res.writeHead(HttpCode.OK, headers);
        const { updatedTodo, select, owner } = JSON.parse(data);

        if (select !== undefined) {
          const todo = await Todo.findOneAndUpdate(
            { _id: todoId, owner },
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
              code: HttpCode.OK,
              message: "todo select",
              todo,
            })
          );
          return;
        }

        const todo = await Todo.findOneAndUpdate(
          { _id: todoId, owner },
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
            code: HttpCode.OK,
            message: "todo updated",
            todo,
          })
        );
      });
    } catch (error) {
      res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
      res.end(error);
    }
  } else if (req.url === "/todos/select.all" && req.method === "POST") {
    req.on("data", async (data) => {
      try {
        res.writeHead(HttpCode.OK, "select all", headers);
        const todo = await Todo.updateMany(JSON.parse(data), {
          completed: true,
        });

        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "select all",
            todo,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  } else if (req.url === "/todos/unselect.all" && req.method === "POST") {
    req.on("data", async (data) => {
      try {
        res.writeHead(HttpCode.OK, "unselect all", headers);
        const todo = await Todo.updateMany(JSON.parse(data), {
          completed: false,
        });

        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "unselect all",
            todo,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  } else if (req.url === "/todos/clear.completed" && req.method === "POST") {
    req.on("data", async (data) => {
      try {
        res.writeHead(HttpCode.OK, "clear completed", headers);
        const todo = await Todo.deleteMany({
          ...JSON.parse(data),
          completed: true,
        });

        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "clear completed",
            todo,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  }

  // user ==========================================================================
  else if (req.url === "/users/current" && req.method === "POST") {
    req.on("data", async (body) => {
      try {
        const user = await User.findOne(JSON.parse(body));
        res.writeHead(HttpCode.OK, "current user", headers);
        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "current user",
            user,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  } else if (req.url === "/users/signup" && req.method === "POST") {
    try {
      req.on("data", async (body) => {
        const parsedBody = JSON.parse(body);
        const hasUser = await User.findOne({ name: parsedBody.name });
        if (hasUser) {
          res.writeHead(HttpCode.CONFLICT, "name in use", headers);
          res.end(
            JSON.stringify({
              status: "error",
              code: HttpCode.CONFLICT,
              message: "name in use",
            })
          );
          return;
        }

        const user = await new User(parsedBody).save();
        res.writeHead(HttpCode.OK, "user created", headers);
        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "user created",
            user,
          })
        );
      });
    } catch (error) {
      res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
      res.end(error);
    }
  } else if (req.url === "/users/login" && req.method === "POST") {
    try {
      req.on("data", async (body) => {
        const user = await User.findOne(JSON.parse(body));

        if (!user) {
          res.writeHead(
            HttpCode.UNAUTHORIZED,
            "name or password is wrong",
            headers
          );
          res.end(
            JSON.stringify({
              status: "error",
              code: HttpCode.UNAUTHORIZED,
              message: "name or password is wrong",
            })
          );
          return;
        }

        const userVerified = await User.findOneAndUpdate(
          { _id: user._id },
          { isVerified: true },
          { new: true }
        );
        res.writeHead(HttpCode.OK, headers);
        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            user: userVerified,
          })
        );
      });
    } catch (error) {
      res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
      res.end(error);
    }
  } else if (req.url === "/users/logout" && req.method === "POST") {
    req.on("data", async (body) => {
      try {
        const user = await User.findOneAndUpdate(
          JSON.parse(body),
          { isVerified: false },
          { new: true }
        );
        res.writeHead(HttpCode.OK, "user logout", headers);
        res.end(
          JSON.stringify({
            status: "success",
            code: HttpCode.OK,
            message: "user logout",
            user,
          })
        );
      } catch (error) {
        res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, headers);
        res.end(error);
      }
    });
  }

  // user ==========================================================================
  else if (!todoId) {
    res.writeHead(HttpCode.BAD_REQUEST, "bad request", headers);
    res.end(
      JSON.stringify({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "bad request",
      })
    );
  } else {
    res.writeHead(HttpCode.NOT_FOUND, headers);
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
