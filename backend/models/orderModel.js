const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  quantity: Number,
  totalPrice: Number,
  paymentId: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
