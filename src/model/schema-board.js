const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    title: { type: String, required: [true, "please add title"] },
    bgColor: { type: String, default: "#fff" },

    columns: { type: Array, set: (data) => (!data ? [] : data) },
    labels: { type: Array, set: (data) => (!data ? [] : data) },
  },
  { versionKey: false }
);

const Board = model("board", boardSchema);

module.exports = Board;
