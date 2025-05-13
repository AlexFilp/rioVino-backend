const { Schema, model } = require("mongoose");
const { handleMongooseSchemaErr } = require("../utils");

const schema = new Schema(
  {
    id: { type: String, required: true, unique: true }, // Holded product ID
    kind: String,
    name: String,
    desc: String,
    typeId: String,

    contactId: {
      $oid: String, // You could flatten this to `contactId: String` for easier access
    },

    contactName: String,
    price: Number,
    taxes: [String],
    total: Number,
    hasStock: Boolean,
    stock: Number,
    barcode: String,
    sku: String,
    cost: Number,
    purchasePrice: Number,
    weight: Number,
    tags: [String],
    categoryId: String,
    factoryCode: String,
    forSale: Number,
    forPurchase: Number,
    salesChannelId: String,
    expAccountId: String,
    warehouseId: String,
    translations: [Schema.Types.Mixed], // Any data type allowed
  },
  { versionKey: false, timestamps: true }
);

// const schema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     subType: {
//       type: String,
//       required: true,
//     },
//     alcohol: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: String,
//       required: true,
//     },
//     discount: {
//       type: String,
//       default: "0",
//     },
//     capacity: {
//       type: String,
//       required: true,
//     },
//     region: {
//       type: String,
//       required: true,
//     },
//     year: {
//       type: String,
//       default: "",
//     },
//     description: {
//       type: String,
//     },
//     critics: {
//       type: Array,
//       default: [],
//     },
//     iva: {
//       type: Boolean,
//       default: true,
//     },
//     productImages: {
//       type: [Object],
//       default: [],
//     },
//     // imageURL: {
//     //   type: String,
//     //   default: "",
//     // },
//     // imageID: {
//     //   type: String,
//     //   default: "",
//     // },
//   },
//   { versionKey: false, timestamps: true }
// );

schema.post("save", handleMongooseSchemaErr);

const Product = model("product", schema);

module.exports = Product;
