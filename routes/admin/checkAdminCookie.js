import express from 'express'
import checkAdminCookie from '../../contorllers/admin/checkAdminCookie.js'

const checkAdminCookieRouter = express.Router()

checkAdminCookieRouter.get("/check-admin-cookie", checkAdminCookie)

export default checkAdminCookieRouter