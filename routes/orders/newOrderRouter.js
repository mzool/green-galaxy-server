import express from "express";
import newOrder from "../../contorllers/orders/newOrder.js";
import validateRequest from "../../middlewares/validation/validationFunction.js";
import newOrderShema from "../../middlewares/validation/orders/newOrderShema.js";

const newOrderRouter = express.Router();

newOrderRouter.post("/new-order", validateRequest(newOrderShema), newOrder);

export default newOrderRouter