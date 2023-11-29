import bcrypt from "bcrypt"
import user from "../../model/users.js"
import logger from "../../services/winston_logger.js"
import sendEmail from "../../services/mailer.js"
import { generatePasetoToken } from "../../services/passeto.js"
import idGenerator from "../../services/idGenerator.js"
const registerNewUser = async (req, res) => {
    try {
        if (req.headers?.cookie?.includes("user")) {
            return res.status(401).json({ error: "failed to regester, try again later" })
        };
        const { username, email, password, confirmPassword, phone, isAdmin } = req.body;
        const doesPhoneExist = await user.findOne({ phone });
        const doesEmailExist = await user.findOne({ email });
        const doesNameExist = await user.findOne({ username });
        /// if email or phone is registerd then return
        if (doesEmailExist) {
            logger.info(`user with email ${email}, attempt to register again`)
            return res.status(401).json({ error: "user email is already registerd!" });

        } else if (doesPhoneExist) {
            logger.info(`user with phone ${phone}, attempt to register again`)
            return res.status(401).json({ error: "phone number is already registerd!" })
        } else if (doesNameExist) {
            return res.status(401).json({ error: "username is already taken!" });
        } else {
            // hashing password
            const hash = bcrypt.hashSync(password, JSON.parse(process.env.saltNum));
            //// generate id 
            let user_id = idGenerator(10);
            let i = 0;
            do {
                user_id = idGenerator(10);
                i++;
                if (i === 1000) { return res.status(500).json({ error: "Error, please try later" }) }
            } while (await user.findOne({ user_id }))
            const _newUser = await new user({
                username,
                user_id,
                email,
                phone,
                password: hash,
                isAdmin: isAdmin ? isAdmin : "user"
            }).save()
            logger.info(`new user registerd with email ${email}`);
            /// send confirmation email 
            const token = await generatePasetoToken({ email, user_id: user_id }, 1);
            const url = `${req.protocol}://${req.headers.host}${process.env.apiurl}/confirm-email/${token}`
            const emailInputs = {
                email,
                sub: 'Confirm your Email',
                text: 'Please confirm your email address by clicking the button below:',
                html: `<div><h2>Please confirm your email address by clicking the link below:</h2><a href=${url} style=\"background-color: green; color: white; padding: 10px 20px; text-decoration: none; border: none; cursor: pointer; display: inline-block;\">Confirm Your Email</a></div><div style=\"color: white; font-family: Arial, sans-serif;\"><h3>&copy; <span>Green Galaxy</span></h3></div>`
            };
            sendEmail(emailInputs);
            res.cookie("user", token, {
                secure: true,
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            })
            return res.status(200).json({ message: "success" });
        }
    } catch (err) {
        logger.info(`error: ${err}`)
        return res.status(500).json({ error: "something went wrong, please try again later ):" })
    }
}


export default registerNewUser