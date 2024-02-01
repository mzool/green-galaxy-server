import express from "express"
import getOTPFromUser from "../../../contorllers/authentication/tow-steps-login/getOTPFromUser.js";
import OTPLimiter from "../../../services/limitRequests.js"
import checkForOtpToken from "../../../contorllers/authentication/tow-steps-login/checkForOTPFormToken.js";

const getOTPFromUserRouter = express.Router();

getOTPFromUserRouter.post("/get-Otp-from-user", OTPLimiter,
    (req, res, next) => checkForOtpToken(req, res, next), getOTPFromUser)


export default getOTPFromUserRouter


