import express from "express"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import registerSchema from "../../middlewares/validation/registerValidation.js"
import registerNewUser from "../../contorllers/authentication/register.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const registerRouter = express.Router()

registerRouter.post('/register/new/user', authorizeReq, validateRequest(registerSchema),registerNewUser)
export default registerRouter