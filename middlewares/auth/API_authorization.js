import fs from "fs";
import logger from "../../services/winston_logger.js";
import { verifyPasetoToken } from "../../services/passeto.js"


async function authorizeReq(req, res, next) {
    try {
        const authorization_token = req.headers.shellOne;
        if (!authorization_token) {
            return res.status(401).json({ success: false, stage:1, message: "Permession required" })
        } else {
            const token = authorization_token.split("GreenBearer ")[1];
            const publicKey = fs.readFileSync("publicKey.pem");
            const decoded = await verifyPasetoToken(token, publicKey);
            if (!decoded) {
                return res.status(401).json({ success: false, message: "we could not verify the token" })
            } else {
                next();
            }
        }
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later" })
    }
}

export default authorizeReq