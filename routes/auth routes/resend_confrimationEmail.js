import express from "express";
import reSendConfirmationEmail from "../../contorllers/authentication/resend_confirmationEmail.js";
import { resendEmailConfirmationLimiter } from "../../services/limitRequests.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const reSendRouter = express.Router();

reSendRouter.get("/resend-confirmation-email", authorizeReq, resendEmailConfirmationLimiter, reSendConfirmationEmail);


export default reSendRouter