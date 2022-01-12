const { Schema, model, SchemaTypes } = require("mongoose");

const columnSchema = new Schema(
  {
    title: String,
    cards: { type: Array, set: (data) => (!data ? [] : data) },
    owner: { type: SchemaTypes.ObjectId, ref: "board" },
  },
  { versionKey: false }
);

const Column = model("column", columnSchema);

module.exports = Column;
