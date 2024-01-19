import express from "express";
import getUser from "../../contorllers/authentication/getUser.js";
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const getUserRouter = express.Router();

getUserRouter.get("/get-user", authorizeReq, getUser);


export default getUserRouter