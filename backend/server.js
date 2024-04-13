const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectToMongoDB = require("./database/db");
const cors = require("cors");
const app = express();

// Config
connectToMongoDB();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);


const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running is successfully on the port: ${port}`);
});
