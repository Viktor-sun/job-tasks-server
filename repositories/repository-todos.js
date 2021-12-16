const Todo = require("../model/schema-todos");

const getAllTodos = async () => {
  const todos = await Todo.find({});
  return todos;
};

const addTodo = async (body) => {
  const todo = await Todo.create(body);
  return todo;
};

const removeTodo = async (todoId) => {
  const todo = await Todo.findByIdAndRemove({ _id: todoId });
  return todo;
};

const updateTodo = async (todoId, updatedTodo) => {
  const todo = await Todo.findOneAndUpdate({ _id: todoId }, updatedTodo, {
    new: true,
  });
  return todo;
};

const selectTodos = async (isCompleted) => {
  const todo = await Todo.updateMany({ completed: isCompleted });
  return todo;
};

const clearCompleted = async () => {
  const todo = await Todo.deleteMany({
    completed: true,
  });
  return todo;
};

module.exports = {
  getAllTodos,
  addTodo,
  removeTodo,
  updateTodo,
  selectTodos,
  clearCompleted,
};
