const { Schema, model, SchemaTypes } = require("mongoose");

const labelSchema = new Schema(
  {
    owner: { type: SchemaTypes.ObjectId, ref: "board" },
    label: String,
  },
  { versionKey: false }
);

const Label = model("label", labelSchema);

module.exports = Label;
