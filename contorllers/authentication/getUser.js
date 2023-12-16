import logger from "../../services/winston_logger.js"
import user from '../../model/users.js'
import fs from "fs"
import { fileURLToPath } from "url";
import path from "path";
import { verifyPasetoToken } from "../../services/passeto.js"
async function getUser(req, res) {
    try {
        /// get the token inside the cookie
        const { cookie } = req.headers;
        let token;
        cookie.split(";").map((cookie) => {
            cookie.split("=")[0].trim() === "user" ? token = cookie.split("=")[1] : null
        });
        /// get the public key file
        let __dirname = fileURLToPath(import.meta.url);
        let publicKeyFile = path.join(__dirname, "../../../publicKey.pem")
        const publicKey = fs.readFileSync(publicKeyFile);
        /// verify the token
       let payload =  await verifyPasetoToken(token, publicKey);
       let theUser = await user.findOne({email: payload.payload.email, user_id: payload.payload.user_id});
       return res.status(200).json({
        _id: theUser.user_id,
        name: theUser.username,
        email: theUser.email,
        confirm_email: theUser.confirmEmail,
        permesions: theUser.isAdmin,
        phone: theUser.phone,
        profileImage: theUser.profileImage
       })
    } catch (err) {
        logger.info(`error:${err.message} `);
        return res.status(500).json({ error: "server error, sorry." })
    }
}

export default getUser