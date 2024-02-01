import logger from "../../services/winston_logger.js";
import cash from "../../services/redis.js";
import fs from "fs"
import path from "path";

async function veriyOTP(req, res) {
    try {
        const { otp } = req.body;
        const { user } = req;
        /// get public key
        const pathToPublicKey = path.resolve("publicKey.pem");
        const publicKey = fs.readFileSync(pathToPublicKey);
        if (!Number(otp)) {
            return res.status(401).json({ success: false, message: "invalid user token or OTP" })
        } else {
            let theUserOtp = await cash("get", String(user.user_id));
            if (!theUserOtp) return res.status(401).json({ success: false, message: "wrong password" })
            /// check if user otp is valid
            if (theUserOtp == otp) {
                res.cookie("permesions", user.isAdmin, {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                await cash("del", user.user_id);
                return res.status(200).json({ success: true, rule: user.isAdmin, message: "otp verified successfully" })
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