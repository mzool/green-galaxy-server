import express from "express"
import authorizeReq from "../../middlewares/auth/API_authorization.js"
import updateProfileImage from "../../contorllers/user/updateProfileImage.js"
import upload from "../../middlewares/files upload/upload.js"
import authUser from "../../middlewares/auth/checkUser.js"

const updateImageRouter = express.Router();

updateImageRouter.put("/update-profile-image", authorizeReq, authUser, upload, updateProfileImage)

export default updateImageRouter