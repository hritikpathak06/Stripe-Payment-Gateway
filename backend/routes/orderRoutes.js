const express = require("express");
const { createPayment, getAllOrders } = require("../controllers/orderController");
// const { createOrder } = require("../controllers/orderController");
const router = express.Router();

router.post("/create",createPayment);
router.get("/all",getAllOrders)

module.exports = router;