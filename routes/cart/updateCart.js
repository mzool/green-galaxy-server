import express from "express"
import authorizeReq from '../../middlewares/auth/API_authorization.js'
import deleteCart from "../../contorllers/cart/updateCart.js";

const updateCartRouter = express.Router();

updateCartRouter.delete("/delete-cart", authorizeReq, deleteCart);


export default updateCartRouter