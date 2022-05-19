const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      required: false,
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  SubCategory: {
    type: String,
    required: [true, "Please Enter Sub Category of Product"],
  },
  ProductSize: [
    {
      size: {
        type: String,
        required: false,
       },
      stock: {
        type: String,
        required: false,
      }
    },
  ],
  // ProductSize:[{
  //   size: String,
  //   stock : String,
  //   // required: [true, "Please Enter Size of Product"]
  // }],
  // Stock: {
  //   type: Number,
  //   required: [true, "Please Enter product Stock"],
  //   maxLength: [4, "Stock cannot exceed 4 characters"],
  //   default: 1,
  // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  additionalComments: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
