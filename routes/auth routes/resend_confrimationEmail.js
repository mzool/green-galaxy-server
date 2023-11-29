import express from "express";
import reSendConfirmationEmail from "../../contorllers/authentication/resend_confirmationEmail.js";
import { resendEmailConfirmationLimiter } from "../../services/limitRequests.js"
const reSendRouter = express.Router();

reSendRouter.get("/resend-confirmation-email", resendEmailConfirmationLimiter, reSendConfirmationEmail);


export default reSendRouter