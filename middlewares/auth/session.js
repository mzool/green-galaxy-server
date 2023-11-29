import logger from "../../services/winston_logger.js"
import { verifyPasetoToken } from "../../services/passeto.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import user from "../../model/users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function session(req, res, next) {
    try {
        let { cookie } = req.headers;
        let token, user_id; /// for server side  cookie
        if (cookie) {
            cookie.split(";").map((cookie) => {
                if (cookie.split("=")[0].trim() === "user") {
                    token = cookie.split("=")[1]
                }
                if (cookie.split("=")[0].trim() === "user_session") {
                    user_id = cookie.split("=")[1]
                }
            });
        } else {
            return res.status(401).clearCookie("user").clearCookie("user_session").json({ error: "session expired !" })
        }
        /// verify paseto token
        const publicKeyPath = path.join(__dirname, "../../publicKey.pem");
        const publicKey = fs.readFileSync(publicKeyPath, "utf-8");
        const payload = await verifyPasetoToken(token, publicKey);
        if (payload.payload.user_id != user_id) {
            return  res.status(401).clearCookie("user").clearCookie("user_session").json({ error: "session expired !!" })
        }
        /// get user 
        const theUser = await user.findOne({ user_id, email: payload.payload.email });
        if (theUser) {
            next();
        } else {
            return res.status(401).clearCookie("user").clearCookie("user_session").json({ error: "session expired !!!" })
        }

    } catch (err) {
        logger.info(`error: ${err}`);
        return res.status(500).json({ error: "server error, try again later" })
    }
}

export default session