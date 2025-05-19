const { Schema, model } = require("mongoose");
const { handleMongooseSchemaErr } = require("../utils");

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRegexp, "Incorect email type"],
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      default: "",
    },
    surname: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      default: "user",
    },
    cart: [
      {
        _id: false,
        product: {
          id: String,
          name: String,
          price: Number,
          taxes: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    refreshToken: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleMongooseSchemaErr);

const User = model("user", schema);

module.exports = User;
