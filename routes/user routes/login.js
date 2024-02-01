import express from "express"
import login from "../../contorllers/authentication/login.js";
import validateRequest from "../../middlewares/validation/validationFunction.js";
import loginSchema from "../../middlewares/validation/loginValidationSchema.js";

const loginRouter = express.Router();

loginRouter.post("/login", validateRequest(loginSchema), login)



export default loginRouter