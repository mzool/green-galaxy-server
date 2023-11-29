import express from "express"
import adminPermesion from '../../contorllers/admin/admin_permesion.js'

const adminPermesionRouter = express.Router();


adminPermesionRouter.get("/authenticate-admin", adminPermesion)

export default adminPermesionRouter