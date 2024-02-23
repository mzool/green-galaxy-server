import BlogDB from "../../../model/blogs/blogs.js";
import logger from "../../../services/winston_logger.js"

async function verifyBlog(req, res) {
    try {

    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something weng error" })
    }
}

export default verifyBlog