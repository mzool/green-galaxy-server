import express from 'express'
import filterProducts from '../../contorllers/products/filter.controller.js'
import validateRequest from "../../middlewares/validation/validationFunction.js"
import filterSchema from '../../middlewares/validation/products/filterValidation.js'
/// router
const filterRouter = express.Router()

filterRouter.post("/filter-products", validateRequest(filterSchema), filterProducts);

export default filterRouter