import express from "express"
import getCart from "../../contorllers/cart/getCart.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"


const getCartRouter = express.Router();

getCartRouter.get("/get-cart", authorizeReq, getCart);

export default getCartRouter