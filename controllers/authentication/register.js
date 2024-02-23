import bcrypt from "bcrypt"
import user from "../../model/users.js"
import logger from "../../services/winston_logger.js"
import sendEmail from "../../services/mailer.js"
import { generatePasetoToken } from "../../services/passeto.js"
import generateRandomString from "../../services/randomString.js"
import fs from "fs"
import path from 'path';


const registerNewUser = async (req, res) => {
    try {
        if (req.headers?.cookie?.includes("user")) {
            return res.status(401).json({ error: "failed to regester, try again later" })
        };
        const { username, email, password, phone } = req.body;
        const doesPhoneExist = await user.findOne({ phone });
        const doesEmailExist = await user.findOne({ email: email.toLowerCase() });
        /// if email or phone is registerd then return
        if (doesEmailExist) {
            logger.error(`user with email ${email}, attempt to register again`)
            return res.status(401).json({ error: "user email is already registerd!" });

        } else if (doesPhoneExist) {
            logger.info(`user with phone ${phone}, attempt to register again`)
            return res.status(401).json({ error: "phone number is already registerd!" })
        } else {
            // hashing password
            const hash = bcrypt.hashSync(password, JSON.parse(process.env.saltNum));
            //// generate id 
            let user_id = generateRandomString(10);
            //// check if id is exist for other user
            do {
                user_id = generateRandomString(10);
            } while (await user.findOne({ user_id }))
            const _newUser = await new user({
                username,
                user_id,
                email: email.toLowerCase(),
                phone,
                password: hash,
                isAdmin: "user"
            }).save()
            logger.info(`new user registerd with email ${email}`);
            /// send confirmation email 
            /// generate token
            const token = await generatePasetoToken({ email: email.toLowerCase(), id: user_id }, 1);
            //// url of the email, when user go for we get the params that contains the token and confirm his email
            const url = `${req.protocol}://${req.headers.host}${process.env.apiurl}/confirm-email/${token}`
            ///// get the html file template
            const htmlFilePath = path.resolve("views/sendConfirmEmailMessage.html");
            const html = fs.readFileSync(htmlFilePath, 'utf-8').replace("{$link$}", url);
            const emailInputs = {
                email,
                sub: 'Confirm your Email',
                text: 'Please confirm your email address by clicking the button below:',
                html
            };
            sendEmail(emailInputs);
            res.cookie("user", token, {
                secure: true,
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            })
            return res.status(200).json({ message: "success" });
        }
    } catch (err) {
        console.log(err.message);
        logger.error(err)
        return res.status(500).json({ error: "something went wrong, please try again later ):" })
    }
}


export default registerNewUser