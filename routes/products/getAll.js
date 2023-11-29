import express from "express"
import getAllProducts from "../../contorllers/products/getAllProducts.js";
const allProducts = express.Router();

allProducts.get("/all-products", getAllProducts);



export default allProducts