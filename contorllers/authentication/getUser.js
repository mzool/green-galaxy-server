import logger from "../../services/winston_logger.js"
import user from '../../model/users.js'
import fs from "fs"
import path from "path";
import { verifyPasetoToken } from "../../services/passeto.js"
async function getUser(req, res) {
    try {
        /// get the token inside the cookie
        const cookies = req.cookies;
        const token = cookies["user"];
        //// if no token
        if (!token) {
            for (const cookieName in cookies) {
                res.clearCookie(cookieName);
            }
            return res.status(401).json({ success: false, message: "UnAuthorized" })
        }
        /// get the public key file
        let publicKeyFilePath = path.resolve("publicKey.pem");
        const publicKey = fs.readFileSync(publicKeyFilePath);
        /// verify the token
        let payload = await verifyPasetoToken(token, publicKey);
        let theUser = await user.findOne({ email: payload.payload.email, user_id: payload.payload.id });
        return res.status(200).json({
            success: true,
            data: {
                _id: theUser.user_id,
                name: theUser.username,
                email: theUser.email,
                confirm_email: theUser.confirmEmail,
                permesions: theUser.isAdmin,
                phone: theUser.phone,
                profileImage: theUser.profileImage,
                towStepsLogin:theUser.towStepsLogin
            }
        })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, error: "something went error, try again later" })
    }
}

export default getUser