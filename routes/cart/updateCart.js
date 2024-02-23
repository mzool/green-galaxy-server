import express from "express"
import deleteCart from "../../controllers/cart/updateCart.js";

const updateCartRouter = express.Router();

updateCartRouter.delete("/delete-cart", deleteCart);


export default updateCartRouter