import UsersDB from "../../../model/users.js"


async function getAllEmployees(req, res) {
    try {
        const allAdmins = await UsersDB.find({ isAdmin: { $in: ["admin", "superAdmin"] } });

        return res.status(200).json({ success: true, allAdmins })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ success: false, message: "somthing error, try again later" })
    }
}
export default getAllEmployees