import express from "express"
import login from "../../contorllers/authentication/login.js";
import validateRequest from "../../middlewares/validation/validationFunction.js";
import loginSchema from "../../middlewares/validation/loginValidationSchema.js";
import authrizeReq from "../../middlewares/auth/API_authorization.js"
const loginRouter = express.Router();

loginRouter.post("/login", authrizeReq, validateRequest(loginSchema), login)



export default loginRouter