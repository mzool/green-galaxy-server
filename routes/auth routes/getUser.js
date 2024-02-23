import express from "express";
import getUser from "../../controllers/authentication/getUser.js";

const getUserRouter = express.Router();

getUserRouter.get("/get-user", getUser);


export default getUserRouter