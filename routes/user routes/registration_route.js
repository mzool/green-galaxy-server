import express from "express"
import validateRequest from "../../middlewares/validation/validationFunction.js"
import registerSchema from "../../middlewares/validation/registerValidation.js"
import registerNewUser from "../../contorllers/authentication/register.js"
const registerRouter = express.Router()

registerRouter.post('/register/new/user', validateRequest(registerSchema),registerNewUser)
export default registerRouter