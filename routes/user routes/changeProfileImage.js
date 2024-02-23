import express from "express"
import updateProfileImage from "../../controllers/user/updateProfileImage.js"
import upload from "../../middlewares/files upload/upload.js"
import authUser from "../../middlewares/auth/checkUser.js"

const updateImageRouter = express.Router();

updateImageRouter.put("/update-profile-image", authUser, upload, updateProfileImage)

export default updateImageRouter