import UerDB from "../../model/users.js"
import logger from "../../services/winston_logger.js"
import uploadPhoto from "../../services/uploadImagesToServer.js"
async function updateProfileImage(req, res) {
    try {
        const profileImage = req.files;
        const { user } = req;

        if (!profileImage || !user) {
            return res.status(404).json({ success: false, message: "Required Profile Image and credentials." })
        }

        /// sent profile image to cloudinary
        const image_url = await uploadPhoto(profileImage, `Green_Galaxy/users_profiles/ ${user.user_id}}`);
        /// update user profile image
        UerDB.updateOne({ _id: user._id }, { profileImage: image_url[0] }, { new: true }).then((result) => {
            return res.status(200).json({ success: true, message: "Profile image updated successfully", src: image_url[0] })
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