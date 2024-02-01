import express from "express";
import getUser from "../../contorllers/authentication/getUser.js";

const getUserRouter = express.Router();

getUserRouter.get("/get-user", getUser);


export default getUserRouter