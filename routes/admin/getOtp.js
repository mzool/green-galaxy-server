import express from "express"
import veriyOTP from "../../contorllers/admin/getOtp.js"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import getOtpSchema from "../../middlewares/validation/admin/getOtp.js"
import {OTPLimiter} from "../../services/limitRequests.js"
const getOtpRouter = express.Router();


getOtpRouter.post("/get-admin-otp", validateRequest(getOtpSchema), veriyOTP)

export default getOtpRouter