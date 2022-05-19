const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    userName :{
      type: String,
      required: false,
    },
    userLoggedInDesignation :{
      type: String,
      required: false,
    },
    receivingPersonName :{
      type: String,
      required: false,
    },
    orderDate :{
      type: String,
      required: false,
    },
    additionalComments:{
      type: String,
      required: false,
    },
    userAddress: {
      type: String,
      required: false,
    },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // state: {
    //   type: String,
    //   required: true,
    // },
    // country: {
    //   type: String,
    //   required: true,
    // },
    // pinCode: {
    //   type: Number,
    //   required: true,
    // },
    phoneNo: {
      type: String,
      required: false,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },      
      quantity: {
        type: Number,
        required: true,
      },     
      SubCategory: {
        type: String,
        required:true,
      },
      ProductSize:{
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
