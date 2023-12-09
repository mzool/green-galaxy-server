import express from 'express'
import checkAdminCookie from '../../contorllers/admin/checkAdminCookie.js'
import authorizeReq from '../../middlewares/auth/API_authorization.js'
const checkAdminCookieRouter = express.Router()

checkAdminCookieRouter.get("/check-admin-cookie", authorizeReq, checkAdminCookie)

export default checkAdminCookieRouter