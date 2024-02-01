import express from "express"
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
import checkForOtpToken from "../../../contorllers/authentication/tow-steps-login/checkForOTPFormToken.js";


const checkForOtpTokenRouter = express.Router();

checkForOtpTokenRouter.get("/check-For-Otp-Token", authorizeReq, (req, res) => checkForOtpToken(req, res))


export default checkForOtpTokenRouter