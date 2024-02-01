import express from "express"
import sendOtp from "../../contorllers/admin/sendOtp.js"
import { OTPLimiter } from "../../services/limitRequests.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import authUser from "../../middlewares/auth/checkUser.js"


const sendOtpROuter = express.Router();

sendOtpROuter.get("/send-otp-admin", authorizeReq, authUser, OTPLimiter, sendOtp);

export default sendOtpROuter