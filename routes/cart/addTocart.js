import express from "express"
import validateRequest from '../../middlewares/validation/validationFunction.js'
import AddToCart from "../../contorllers/cart/addToCart.js";
import AddToCartSchema from "../../middlewares/validation/cart/cartSchema.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const addToCartRouter = express.Router();

addToCartRouter.post("/add-to-cart", authorizeReq, validateRequest(AddToCartSchema), AddToCart)

export default addToCartRouter