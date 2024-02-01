import express from "express"
import getLocation from "../../contorllers/getLocation/getUserLocation.js"

const locationRouter = express.Router();


locationRouter.get("/get-location", getLocation);


export default locationRouter