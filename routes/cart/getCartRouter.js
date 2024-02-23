import express from "express"
import getCart from "../../controllers/cart/getCart.js"


const getCartRouter = express.Router();

getCartRouter.get("/get-cart", getCart);

export default getCartRouter