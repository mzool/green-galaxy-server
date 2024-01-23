import UsersDB from "../../model/users.js";
import fs from "fs";
import { verifyPasetoToken } from "../../services/passeto.js";
import path from "path";
async function authUser(req, res, next) {
    try {
        const { user } = req.cookies;

        if (!user) {
            return res.status(401).json({ success: false, message: "session expired, log in and try again" })
        }
        /// check for user session
        const publicKeyPath = path.resolve("publicKey.pem");
        const publicKey = fs.readFileSync(publicKeyPath); ///get public key
        const userTokenPayload = await verifyPasetoToken(user, publicKey);
        const userEmail = userTokenPayload.payload.email;
        /// get the user
        const theUser = await UsersDB.findOne({ email: userEmail });
        if (!theUser) {
            return res.status(401).json({ success: false, message: "session expired" })
        } else if (!theUser.confirmEmail) {
            return res.status(401).json({ success: false, message: "please confirm your email address to continue" })
        } else {
            req.user = theUser;
            next()
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: "auth user went wrong, try again later" })
    }
}
export default authUser