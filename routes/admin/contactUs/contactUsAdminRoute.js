import express from 'express'
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import getContactMsgs from '../../../contorllers/admin/contactUs/getContactUsMsgs.js'
const contactUsAdminRouter = express.Router()

contactUsAdminRouter.get("/get-admin-contact-msgs", isAdmin, getContactMsgs)

export default contactUsAdminRouter