import logger from "../../services/winston_logger.js"
import Blog from "../../model/blogs/blogs.js"

/// to do: limit the comments to set for user and cashing

async function getAllComments(req, res) {
    try {
        const { blog_id } = req.headers;
        if (!blog_id) {
            return res.status(404).json({ success: false, message: "blog not found" })
        }
        const theBlogComments = await Blog.findOne({ blog_id }).select(["-_id"]);
        // let verefiedComments = theBlogComments.comments.filter((comment) => {
        //     return comment.verified == true
        // })
        const allComments = theBlogComments.comments.map((comment) => ({
            user_name: comment.user_name,
            body: comment.body
        }));
        return res.status(201).json({
            success: true, message: `${theBlogComments.comments.length} commment found`,
            data: allComments
        })
    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ success: false, message: "Something wrong, try again later." })
    }
}

export default getAllComments