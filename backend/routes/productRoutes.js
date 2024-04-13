const express = require("express");
const {
  createProduct,
  getAllProduct,
} = require("../controllers/productController");
const router = express.Router();

router.post("/new", createProduct);
router.get("/all", getAllProduct);

module.exports = router;
