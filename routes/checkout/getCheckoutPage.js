import express from "express";
import getCheckoutPage from "../../contorllers/checkout/getCheckoutPage.js";

const getCheckoutPageRouter = express.Router();

getCheckoutPageRouter.get("/get-checkout-page/:cart_id", getCheckoutPage);

export default getCheckoutPageRouter