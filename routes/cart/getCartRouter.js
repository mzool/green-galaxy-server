import express from "express"
import getCart from "../../contorllers/cart/getCart.js"


const getCartRouter = express.Router();

getCartRouter.get("/get-cart", getCart);

export default getCartRouter