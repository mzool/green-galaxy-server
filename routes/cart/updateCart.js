import express from "express"
import deleteCart from "../../contorllers/cart/updateCart.js";

const updateCartRouter = express.Router();

updateCartRouter.delete("/delete-cart", deleteCart);


export default updateCartRouter