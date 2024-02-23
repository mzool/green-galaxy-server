import express from "express"
import getAllProducts from "../../controllers/products/getAllProducts.js";

const allProducts = express.Router();

allProducts.get("/all-products", getAllProducts);



export default allProducts