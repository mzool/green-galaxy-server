import express from "express"
import getLocation from "../../contorllers/getLocation/getUserLocation.js"
import authorizeReq from "../../middlewares/auth/API_authorization.js"

const locationRouter = express.Router();


locationRouter.get("/get-location", authorizeReq, getLocation);


export default locationRouter