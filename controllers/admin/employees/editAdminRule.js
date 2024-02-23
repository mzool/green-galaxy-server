import logger from "../../../services/winston_logger.js";
import UsersDB from "../../../model/users.js";



async function editAdminRule(req, res) {
    try {
        const { id, rule } = req.body;
        const theAdmin = await UsersDB.findOne({ _id: id });
        if (!theAdmin) {
            return res.status(404).json({ success: false, message: "admin not found" })
        }
        theAdmin.isAdmin = rule;
        await theAdmin.save();
        return res.status(200).json({ success: true, message: "admin rule updated successfully" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error" })
    }
}

export default editAdminRule