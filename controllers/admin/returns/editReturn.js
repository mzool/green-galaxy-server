import ReturnsDB from "../../../model/returns/returnsDB.js";
import logger from "../../../services/winston_logger.js"

async function editReturn(req, res) {
    try {
        const { id } = req.params;
        const images = req.files;
        if (!id) {
            return res.status(404).json({ success: false, message: "require return id" })
        }
        const theReturn = await ReturnsDB.findOne({ id });
        if (!theReturn) {
            return res.status(404).json({ success: false, message: "we could not find the return in our DB!" })
        }
        /// if images then add them to the DB
        if (images.length > 0) {
            theReturn.images.push(...images);
        }
        for (const key in req.body) {
            theReturn.key = req.body[key];
        }
        await theReturn.save();
        return res.status(200).json({ success: true, message: "updated successfully" })

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something error, try again later" })
    }
}
export default editReturn