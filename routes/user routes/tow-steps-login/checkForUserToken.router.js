import express from "express"
import checkForOtpToken from "../../../contorllers/authentication/tow-steps-login/checkForOTPFormToken.js";


const checkForOtpTokenRouter = express.Router();

checkForOtpTokenRouter.get("/check-For-Otp-Token", (req, res) => checkForOtpToken(req, res))


export default checkForOtpTokenRouter