import express from "express"
import getAllProducts from "../../contorllers/products/getAllProducts.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const allProducts = express.Router();

allProducts.get("/all-products", authorizeReq, getAllProducts);



export default allProducts