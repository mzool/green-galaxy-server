import logger from "../../services/winston_logger.js";

async function logout(req, res) {
    try {
        const cookies = req.cookies;
        for (const cookieName in cookies) {
            res.clearCookie(cookieName);
        }
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {

        logger.error(`Unexpected error: ${err.message}`);
        return res.status(500).json({ error: "Sorry! Something went wrong. Please try again later." });
    }
}

export default logout;
