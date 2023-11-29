import logger from "../../services/winston_logger.js";
import cash from "../../services/redis.js";
async function veriyOTP(req, res) {
    try {
        const { otp } = req.body;
        const { cookies } = req;

        let pasetoToken = cookies.user;
        let user_id = cookies.user_session;
        if (!pasetoToken || !user_id || !otp || !Number(otp)) {
            return res.status(401).json({ error: "Unauthorized" })
        } else {
            let theUserOtp = await cash("get", String(user_id));
            if (!theUserOtp) return res.status(401).json({ error: "Unauthorized!" })
            /// check if user otp is valid
            if (theUserOtp == otp) {
                res.cookie("permesions", "Admin", {
                    secure: true,
                    httpOnly: true,
                    maxAge: 1 * 24 * 60 * 60 * 1000,
                    sameSite: 'strict'
                });
                await cash("del", user_id)
                return res.status(200).json({
                    success: true,
                    message: "Admin verified"
                })
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