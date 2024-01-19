import logger from "../../services/winston_logger.js";
import cash from "../../services/redis.js";
import fs from "fs"
import { verifyPasetoToken } from "../../services/passeto.js"
import user from "../../model/users.js"
async function veriyOTP(req, res) {
    try {
        const { otp } = req.body;
        const { cookies } = req;
        const pasetoToken = cookies.user;

        /// get public key
        const pathToPublicKey = new URL("../../publicKey.pem", import.meta.url).pathname;
        const publicKey = fs.readFileSync(pathToPublicKey);
        if (!pasetoToken || !otp || !Number(otp)) {
            return res.status(401).json({ success: false, message: "invalid user token or OTP" })
        } else {
            const payload = await verifyPasetoToken(pasetoToken, publicKey);
            const user_id = payload.payload.user_id;
            const theUser = await user.findOne({ user_id });
            let theUserOtp = await cash("get", String(user_id));
            if (!theUserOtp || !theUser) return res.status(401).json({ success: false, message: "wrong password" })
            /// check if user otp is valid
            if (theUserOtp == otp) {
                res.cookie("permesions", theUser.isAdmin, {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                await cash("del", user_id);
                return res.status(200).json({success:true, message:"otp verified successfully"})
            } else {
                return res.status(401).json({
                    error: "OTP invalid",
                    success: false
                })
            }
        }
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default veriyOTP