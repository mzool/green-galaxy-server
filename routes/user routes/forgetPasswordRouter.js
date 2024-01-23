import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import forgetPassword from "../../contorllers/authentication/forgetPassword.js";
import { forgetPasswordLimiter } from "../../services/limitRequests.js";

const forgetPasswordRouter = express.Router();

forgetPasswordRouter.post("/forget-password-login", authorizeReq, forgetPasswordLimiter , forgetPassword)


export default forgetPasswordRouter