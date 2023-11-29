import logger from "../../services/winston_logger.js";
import user from '../../model/users.js';
import path from "path";
import { fileURLToPath } from 'url';
import { verifyPasetoToken } from "../../services/passeto.js";
import fs from "fs";

const publicKeyPath = "publicKey.pem";

async function confirmEmailFunc(req, res) {
    try {
        const { token } = req.params;
        const publicKey = fs.readFileSync(publicKeyPath);
        // Verify the token 
        let decoded = await verifyPasetoToken(token, publicKey);
        // get the user
        const theUser = await user.findOne({ email: decoded.payload.email, user_id: decoded.payload.id });
        if (!theUser) {
            return res.status(401).json({ error: "user email not registered, please go to registration page." })
        } else {
            await theUser.updateOne({ confirmEmail: true });
        }
        /// send html file
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const _path = path.join(__dirname, "../../views/confirmedEmail.html")
        return res.status(200).sendFile(_path)
    } catch (err) {
        logger.info(err.message);
        return res.status(500).json({ error: "Token Expired OR Not Valid!" });
    }
}

export default confirmEmailFunc;
