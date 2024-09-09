const { Schema, model } = require("mongoose");
const { handleMongooseSchemaErr } = require("../utils");
const { required } = require("joi");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    subType: {
      type: String,
      required: true,
    },
    alcohol: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      default: "0",
    },
    capacity: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    critics: {
      type: Array,
      required: true,
    },
    iva: {
      type: Boolean,
      default: true,
    },
    imageURL: {
      type: String,
      default: "",
    },
    imageID: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

schema.post("save", handleMongooseSchemaErr);

const Product = model("product", schema);

module.exports = Product;
