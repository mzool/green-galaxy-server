import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import validateFunction from "../../middlewares/validation/validationFunction.js"
import trackOrderSchema from "../../middlewares/trackorder/trackOrderSchema.js"
import trackOrder from "../../contorllers/trackorder/treackOrder.js"

const trackOrderRouter = express.Router();
trackOrderRouter.post("/track-order", authorizeReq, validateFunction(trackOrderSchema), trackOrder);

export default trackOrderRouter