import express from "express"
import search from "../../controllers/search/search.js"
import searchSchema from "../../middlewares/search/searchSchem.js";
import validateFunc from "../../middlewares/validation/validationFunction.js"

const searchRouter = express.Router();
searchRouter.post("/search", validateFunc(searchSchema), search);

export default searchRouter