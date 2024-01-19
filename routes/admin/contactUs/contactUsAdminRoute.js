import express from 'express'
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import authorizeReq from '../../../middlewares/auth/API_authorization.js'
import getContactMsgs from '../../../contorllers/admin/contactUs/getContactUsMsgs.js'
const contactUsAdminRouter = express.Router()

contactUsAdminRouter.get("/get-admin-contact-msgs", authorizeReq, isAdmin, getContactMsgs)

export default contactUsAdminRouter