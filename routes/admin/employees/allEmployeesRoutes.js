import express from 'express'
import isAdmin from "../../../middlewares/admins/isAdmin.js"
import authorizeReq from "../../../middlewares/auth/API_authorization.js"
import getAllEmployees from '../../../contorllers/admin/employees/getAllEmployees.js'
import editAdminRule from '../../../contorllers/admin/employees/editAdminRule.js'

const employeesRouter = express.Router();

/// get all
employeesRouter.get("/get-all-admins", authorizeReq, isAdmin, getAllEmployees);
/// edit rule
employeesRouter.put("/edit-admin-rule", authorizeReq, isAdmin, editAdminRule)
export default employeesRouter