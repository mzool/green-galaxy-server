import logger from "../../services/winston_logger.js";
import Blog from "../../model/blogs/blogs.js";
async function getOneBlog(req, res) {
    try {
        const { blog_id } = req.headers;
        if (!blog_id) {
            return res.status(404).json({ error: "Require blog ID" })
        }
        const _blog = await Blog.findOne({ blog_id });
        if (!_blog) {
            return res.status(404).json({ error: "Blog not found!" })
        }
        return res.status(200).json({
            message: "Success",
            data: {
                title: _blog.title,
                body: _blog.body,
                blog_id,
                coverImage: _blog.CoverImage,
                comments: _blog.comments
            }
        })
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ error: "somthing Error, try again later." })
    }
}

export default getOneBlog