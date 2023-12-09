import express from "express"
import adminPermesion from '../../contorllers/admin/admin_permesion.js'
import authorizeReq from "../../middlewares/auth/API_authorization.js"
const adminPermesionRouter = express.Router();


adminPermesionRouter.get("/authenticate-admin", authorizeReq, adminPermesion)

export default adminPermesionRouter