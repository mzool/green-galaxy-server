import logger from "../../services/winston_logger.js"
import Blog from "../../model/blogs/blogs.js"

/// to do: limit the comments to set for user and cashing

async function getAllComments(req, res) {
    try {
        const { blog_id } = req.headers;
        if (!blog_id) {
            return res.status(404).json({ error: "blog not found" })
        }
        const theBlogComments = await Blog.findOne({ blog_id }).select(["comments", "-_id"]);
        let verefiedComments = theBlogComments.comments.filter((comment) => {
            return comment.verified == true
        })
        return res.status(201).json({ success: true, message: `${theBlogComments.comments.length} commment found`, data: verefiedComments })
    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Something wrong, try again later." })
    }
}

export default getAllComments