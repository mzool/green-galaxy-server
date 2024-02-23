import express from 'express'
import newReturn from '../../../controllers/admin/returns/newReturn.js'
import deleteReturn from '../../../controllers/admin/returns/deleteReturn.js'
import editReturn from '../../../controllers/admin/returns/editReturn.js'
import getAllReturns from '../../../controllers/admin/returns/getAllReturns.js'
import isAdmin from '../../../middlewares/admins/isAdmin.js'
import upload from "../../../middlewares/files upload/upload.js"

const adminReturnRouter = express.Router()

/// get all 
adminReturnRouter.get("/get-all-returns", isAdmin, getAllReturns)
/// add new
adminReturnRouter.post("/add-return", isAdmin, upload, newReturn)
/// edit
adminReturnRouter.put("/edit-return", isAdmin, editReturn)
/// delete
adminReturnRouter.delete("/delete-return/:id", isAdmin, deleteReturn)



export default adminReturnRouter