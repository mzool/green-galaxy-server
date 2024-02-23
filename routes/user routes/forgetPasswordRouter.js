import express from "express"
import forgetPassword from "../../controllers/authentication/forgetPassword.js";
import { forgetPasswordLimiter } from "../../services/limitRequests.js";

const forgetPasswordRouter = express.Router();

forgetPasswordRouter.post("/forget-password-login", forgetPasswordLimiter , forgetPassword)


export default forgetPasswordRouter