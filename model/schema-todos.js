const { Schema, model, SchemaTypes } = require("mongoose");

const todosSchema = new Schema(
  {
    todo: { type: String, required: [true, "please add todo"] },
    completed: { type: Boolean, default: false },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Todo = model("todo", todosSchema);

module.exports = Todo;
