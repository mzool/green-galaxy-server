import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import getHomeStyle from "../../contorllers/client/getHomePageStyle.js"

const homeStyleRouter = express.Router();

homeStyleRouter.get("/home-style", authorizeReq, getHomeStyle)

export default homeStyleRouter