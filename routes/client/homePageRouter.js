import express from "express"
import getHomeStyle from "../../contorllers/client/getHomePageStyle.js"

const homeStyleRouter = express.Router();

homeStyleRouter.get("/home-style", getHomeStyle)

export default homeStyleRouter