import express from "express";
import validateRequest from "../../middlewares/validation/validationFunction.js";
import newSubscriber from "../../middlewares/subscribers/subScehma.js";
import addSubscriber from "../../contorllers/subscribe/newSubscriber.js";
//// new subscriber
const subscriberRouter = new express.Router();
subscriberRouter.post("/new-subscriber", validateRequest(newSubscriber), addSubscriber)
///
export default subscriberRouter