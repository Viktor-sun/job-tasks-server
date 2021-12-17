const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    name: { type: String, required: [true, "field name is required"] },
    password: { type: String, required: [true, "field password is required"] },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    // toJSON: {
    //   transform: function (doc, ret) {
    //     delete ret.password;
    //     return ret;
    //   },
    // },
  }
);

const User = model("user", usersSchema);

module.exports = User;
