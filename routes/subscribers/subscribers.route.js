import express from "express";
import validateRequest from "../../middlewares/validation/validationFunction.js";
import newSubscriber from "../../middlewares/subscribers/subScehma.js";
import addSubscriber from "../../contorllers/subscribe/newSubscriber.js";
import authrizeReq from "../../middlewares/auth/API_authorization.js"
//// new subscriber
const subscriberRouter = new express.Router();
subscriberRouter.post("/new-subscriber", authrizeReq, validateRequest(newSubscriber), addSubscriber)
///
export default subscriberRouter