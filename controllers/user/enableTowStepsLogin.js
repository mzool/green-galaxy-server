import logger from "../../services/winston_logger.js"
import UsersDB from "../../model/users.js";

async function enableTowStepsLogin(req, res) {
    try {
        const { user } = req;

        /// get the user and modify the DB
        const theUser = await UsersDB.findOne({ _id: user._id });
        if (!theUser) {
            return res.status(404).json({
                success: false,
                message: "we could not find the user"
            })
        }
        theUser.towStepsLogin = !theUser.towStepsLogin;

        await theUser.save();
        return res.status(200).json({
            success: true, message: theUser.towStepsLogin ?
                "Tow steps login enabled" : "Tow steps login disabled",
            towStepsLogin:theUser.towStepsLogin
        })

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "somthing went error, try again later" })
    }
}
export default enableTowStepsLogin