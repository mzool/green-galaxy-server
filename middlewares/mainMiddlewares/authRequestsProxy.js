import fs from "fs";
import logger from "../../services/winston_logger.js";
import { verifyPasetoToken } from "../../services/passeto.js"


async function AuthReqProxy(req, res, next) {
    try {
        console.log(req.headers);
        const authorization_token = req.headers["authorization"];
        if (!authorization_token) {
            return res.status(401).json({ error: "Unauthorized request!!" })
        } else {
            const token = authorization_token.split("proxy ")[1];
            const publicKey = fs.readFileSync("publicKey.pem");
            const decoded = await verifyPasetoToken(token, publicKey);
            if (!decoded) {
                return res.status(401).json({ error: "UnAuthorized Request!" })
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

export default AuthReqProxy