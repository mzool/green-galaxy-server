import express from "express";
import session from "../../middlewares/auth/session.js";
import getUser from "../../contorllers/authentication/getUser.js";
const getUserRouter = express.Router();

getUserRouter.get("/get-user", session, getUser);


export default getUserRouter