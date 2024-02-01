import user from "../../model/users.js"
import logger from "../../services/winston_logger.js";
import { verifyPasetoToken } from "../../services/passeto.js";
import fs from "fs";
import path from "path";

async function isAdmin(req, res, next) {
    try {
        /// get token cookie
        const user_token  = req.cookies.user;
        /// check for the cookie
        if (!user_token) {
            return res.status(401).json({ error: "Unauthorized !" });
        }
        /// verify token
        const publicKeyPath = path.resolve("publicKey.pem");
        let publicKey = fs.readFileSync(publicKeyPath);
        const userData = await verifyPasetoToken(user_token, publicKey);

        let theUser = await user.findOne({ user_id: userData.payload.id });
        if (!theUser) {
            return res.status(401).json({ error: "Unauthorized Session!" });
        }
        let _per = theUser.isAdmin;
        if (_per !== "admin" && _per !== "superAdmin") {
            return res.status(401).json({ error: "Unauthorized !" });
        }
        next()
    } catch (err) {
        console.log(err);
        logger.error(err);
        return res.status(500).json({ error: "Somthing Error, please try again later." })
    }
}

export default isAdmin