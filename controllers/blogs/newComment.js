import Blog from '../../model/blogs/blogs.js'
import logger from "../../services/winston_logger.js"

async function AddNewComment(req, res) {
    try {
        const { username, email, body } = req.body;
        const { blog_id } = req.headers;
        /// get the blog
        const theBlog = await Blog.findOne({ blog_id });
        /// check for the blog
        if (!theBlog) {
            return res.status(404).json({ success: false, error: "blog not found" })
        }
        /// get the comments array
        let commentsArr = theBlog.comments;
        /// push to the array
        commentsArr.push({
            user_name: username,
            user_email: email,
            body,
            verified: false
        });
        await Blog.updateOne({ blog_id }, { comments: commentsArr })
        return res.status(201).json({ success: true })
    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later." })
    }
}

export default AddNewComment