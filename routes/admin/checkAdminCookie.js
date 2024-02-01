import express from 'express'
import checkAdminCookie from '../../contorllers/admin/checkAdminCookie.js'
import authUser from "../../middlewares/auth/checkUser.js"

const checkAdminCookieRouter = express.Router()

checkAdminCookieRouter.get("/check-admin-cookie", authUser, checkAdminCookie)

export default checkAdminCookieRouter