const { Schema, model } = require("mongoose");

const todosSchema = new Schema(
  {
    todo: { type: String, required: [true, "please add todo"] },
    completed: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const Todo = model("todo", todosSchema);

module.exports = Todo;
