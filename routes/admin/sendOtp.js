import express from "express"
import sendOtp from "../../contorllers/admin/sendOtp.js"
import { OTPLimiter } from "../../services/limitRequests.js"
import authUser from "../../middlewares/auth/checkUser.js"


const sendOtpROuter = express.Router();

sendOtpROuter.get("/send-otp-admin", authUser, OTPLimiter, sendOtp);

export default sendOtpROuter