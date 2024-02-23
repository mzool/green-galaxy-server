import express from "express";
import reSendConfirmationEmail from "../../controllers/authentication/resend_confirmationEmail.js";
import { resendEmailConfirmationLimiter } from "../../services/limitRequests.js";
import authUser from "../../middlewares/auth/checkUser.js"

const reSendRouter = express.Router();

reSendRouter.get("/resend-confirmation-email", authUser, resendEmailConfirmationLimiter, reSendConfirmationEmail);


export default reSendRouter