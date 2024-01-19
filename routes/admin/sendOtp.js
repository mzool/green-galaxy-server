import express from "express"
import sendOtp from "../../contorllers/admin/sendOtp.js"
import { OTPLimiter } from "../../services/limitRequests.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"

const sendOtpROuter = express.Router();

sendOtpROuter.get("/send-otp-admin", authorizeReq, OTPLimiter, sendOtp);

export default sendOtpROuter