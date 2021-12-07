const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    name: { type: String, default: "Guest" },
    password: { type: String, required: [true, "field password is required"] },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = model("user", usersSchema);

module.exports = User;
