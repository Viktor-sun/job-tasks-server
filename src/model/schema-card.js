const { Schema, model, SchemaTypes } = require("mongoose");

const cardSchema = new Schema(
  {
    boardId: { type: SchemaTypes.ObjectId, ref: "board" },
    owner: { type: SchemaTypes.ObjectId, ref: "column" },
    date: Date,
    title: { type: String, required: [true, "title is required"] },
    summary: String,
    description: String,
    priority: String,
    reporter: String,
    status: String,
    label: String,
  },
  { versionKey: false }
);

const Card = model("card", cardSchema);

module.exports = Card;
