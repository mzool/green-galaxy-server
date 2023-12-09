import express from "express";
import contactUs from "../../contorllers/contactus/contactus.js";
import contactUsSchema from "../../middlewares/validation/user/contactusSchema.js";
import validateRequest from "../../middlewares/validation/validationFunction.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"

const contactUsRouter = express.Router();

contactUsRouter.post("/contact-us-user", authorizeReq, validateRequest(contactUsSchema), contactUs);

export default contactUsRouter