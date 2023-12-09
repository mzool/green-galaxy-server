import express from "express";
import getCheckoutPage from "../../contorllers/checkout/getCheckoutPage.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const getCheckoutPageRouter = express.Router();

getCheckoutPageRouter.get("/get-checkout-page/:cart_id", authorizeReq, getCheckoutPage);

export default getCheckoutPageRouter