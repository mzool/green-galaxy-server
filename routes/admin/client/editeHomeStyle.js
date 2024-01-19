import express from "express"
import editeHomeStyle from "../../../contorllers/admin/client/editeHomeStyle.js"
import authReq from "../../../middlewares/auth/API_authorization.js"
import isAdmin from "../../../middlewares/auth/checkUserPermesions.js"


const editStyleRouter = express.Router()

editStyleRouter.post("/edit-home-style", authReq, editeHomeStyle)

export default editStyleRouter