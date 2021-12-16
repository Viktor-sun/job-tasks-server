const { HttpCode } = require("../helpers/constants");
const todosRepository = require("../repositories/repository-todos");

const getAll = async (_req, res, next) => {
  try {
    const todos = await todosRepository.getAllTodos();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { todos },
    });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const todo = await todosRepository.addTodo(req.body);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const todo = await todosRepository.removeTodo(req.params.todoId);

    if (!todo) {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found todo",
      });
    }
    res.status(HttpCode.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const todo = await todosRepository.updateTodo(req.params.todoId, req.body);

    if (!todo) {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found todo",
      });
    }

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

const select = async (_req, res, next) => {
  try {
    const todo = await todosRepository.selectTodos(true);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

const unselect = async (_req, res, next) => {
  try {
    const todo = await todosRepository.selectTodos(false);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

const removeCompleted = async (_req, res, next) => {
  try {
    const todo = await todosRepository.clearCompleted();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  add,
  remove,
  update,
  select,
  unselect,
  removeCompleted,
};
