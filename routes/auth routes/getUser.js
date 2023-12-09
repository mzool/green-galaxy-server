import express from "express";
import session from "../../middlewares/auth/session.js";
import getUser from "../../contorllers/authentication/getUser.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const getUserRouter = express.Router();

getUserRouter.get("/get-user", authorizeReq, session, getUser);


export default getUserRouter