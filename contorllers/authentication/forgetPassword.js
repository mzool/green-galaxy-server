import logger from "../../services/winston_logger.js";
import UserDB from "../../model/users.js"
import sendEmail from "../../services/mailer.js"
import path from 'path'
import fs from 'fs'
import bcrypt from "bcrypt"
import generateRandomString from "../../services/randomString.js"
async function forgetPassword(req, res) {
    try {
        const { email } = req.body;
        const theUser = await UserDB.findOne({ email });
        console.log(req.body);
        if (!theUser) { return res.status(200).json({ success: true, message: "email sent to user" }) };
        /// create the pass
        const password = generateRandomString(10);
        /// hash the password
        const hash = bcrypt.hashSync(password, JSON.parse(process.env.saltNum));
        /// set the password to the DB
        theUser.temporaryPassword = hash;
        await theUser.save();
        /// get the html file path
        const filePath = path.resolve("views/forgetPassword.html");
        /// read the file
        const html = fs.readFileSync(filePath, "utf-8").replace("{password}", password);
        /// email input
        const input = {
            email,
            html,
            sub: "Password recovery",
            text: "As your request; this is a password recovery email"
        }
        sendEmail(input);
        return res.status(200).json({ success: true, message: "email sent to user" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default forgetPassword