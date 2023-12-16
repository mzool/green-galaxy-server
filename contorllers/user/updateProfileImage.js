import user from "../../model/users.js"
import logger from "../../services/winston_logger.js"
import fs from "fs"
import { verifyPasetoToken } from "../../services/passeto.js"
import uploadPhoto from "../../services/uploadImagesToServer.js"
async function updateProfileImage(req, res) {
    try {
        const profileImage = req.files;
        const { cookies } = req;
        if (!profileImage || !cookies) {
            return res.status(404).json({ success: false, message: "Required Profile Image and credentials." })
        }
        /// get the user token
        const user_token = cookies.user;
        /// if no user token
        if (!user_token) {
            return res.status(401).json({ success: false, message: "Unauthorized request" })
        }
        /// check for the token for authorize it
        const publicKey = fs.readFileSync("publicKey.pem");
        const tokenPayload = await verifyPasetoToken(user_token, publicKey);
        if (!tokenPayload) {
            return res.status(401).json({ success: false, message: "Session Expired" })
        }
        /// get the user
        const theUser = await user.findOne({ user_id: tokenPayload.payload.user_id });
        if (!theUser) { return res.status(401).json({ success: false, message: "Session Expired, user not found" }) };
        /// sent profile image to cloudinary
        const image_url = await uploadPhoto(profileImage, `Green_Galaxy/users_profiles/ ${theUser.user_id}}`);
        /// update user profile image
        user.updateOne({ user_id: theUser.user_id }, { profileImage: image_url[0] }, { new: true }).then((result) => {
            return res.status(200).json({ success: true, message: "Profile image updated successfully", src:image_url[0] })
        }).catch((err) => {
            logger.error(err);
            console.log(err.message);
            return res.status(400).json({ success: false, message: "Error on profile image" })
        })


    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, please try again later" })
    }
}
export default updateProfileImage