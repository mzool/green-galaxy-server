import express from "express"
import createImage from "../../../contorllers/admin/imageGenerator/generateImage.js"


const imageGeneratorRouter = express.Router();

imageGeneratorRouter.get("/generate-image", createImage)

export default imageGeneratorRouter