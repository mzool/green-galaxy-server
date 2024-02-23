import express from "express"
import editeHomeStyle from "../../../controllers/admin/client/editeHomeStyle.js"
import isAdmin from "../../../middlewares/auth/checkUserPermesions.js"


const editStyleRouter = express.Router()

editStyleRouter.post("/edit-home-style", editeHomeStyle)

export default editStyleRouter