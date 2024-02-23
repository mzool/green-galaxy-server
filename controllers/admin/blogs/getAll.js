import Blog from "../../../model/blogs/blogs.js";
import logger from "../../../services/winston_logger.js";

async function getAllBlogs(req, res) {
    try {
        const allBlogs = await Blog.find({});
        return res.status(200).json({ success: true, allBlogs })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error" })
    }
}
export default getAllBlogs