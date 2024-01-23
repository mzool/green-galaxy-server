import UerDB from "../../model/users.js"
import logger from "../../services/winston_logger.js"
import bcrypt from "bcrypt"
//// add validation middleware before
async function changePassword(req, res) {
    try {
        const { newPassword, confirmNewPassword, oldPassword } = req.body;
        const { user } = req;

        /// check if old password is true
        const checkPassword = bcrypt.compareSync(oldPassword, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "wrong old password" })
        }
        /// hash new password
        const hash = bcrypt.hashSync(newPassword, JSON.parse(process.env.saltNum))
        /// save the new password
        await UerDB.updateOne({ _id: user._id }, { password: hash }, { new: true });
        return res.status(200).json({ success: true, message: "password updated successfully" })

    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, please try again later" })
    }
}
export default changePassword