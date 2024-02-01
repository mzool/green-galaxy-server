import express from 'express'
import checkAdminCookie from '../../contorllers/admin/checkAdminCookie.js'
import authorizeReq from '../../middlewares/auth/API_authorization.js'
import authUser from "../../middlewares/auth/checkUser.js"

const checkAdminCookieRouter = express.Router()

checkAdminCookieRouter.get("/check-admin-cookie", authorizeReq, authUser, checkAdminCookie)

export default checkAdminCookieRouter