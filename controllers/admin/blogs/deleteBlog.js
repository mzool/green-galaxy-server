import BlogsDB from "../../../model/blogs/blogs.js"
import logger from "../../../services/winston_logger.js";

async function deleteBlog(req, res) {
    try {
        const { blog_id } = req.params;
        if (!blog_id) {
            return res.status(400).json({ success: false, message: "require blog id" })
        }
        await BlogsDB.findOneAndDelete({ blog_id }).then(() => {
            return res.status(200).json({ success: true, message: "blog deleted successfully" })
        }).catch((err) => {
            console.log(err.message);
            return res.status(500).json({ success: false, message: err.message })
        })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something went error, try again later" })
    }
}

export default deleteBlog