import Blogs from "../../../model/blogs/blogs.js";
import logger from "../../../services/winston_logger.js"
import uploadPhoto from "../../../services/uploadImagesToServer.js";

async function editBlog(req, res) {
    try {
        const { title, body, blog_id } = req.body;
        const images = req.files;
        /// get the blog from dgb
        const theBlog = await Blogs.findOne({ blog_id });
        if (!theBlog) {
            return res.status(404).json({ success: false, message: "blog not found in db" })
        };
        if (images.length>0) {
            const image_url = await uploadPhoto(images, `Green_Galaxy/blogs/${blog_id}`);
            theBlog.CoverImage = image_url;
        }
        if (title) {
            theBlog.title = title;
        }
        if (body) {
            theBlog.body = body
        }
        await theBlog.save();
        return res.status(200).json({ success: true, message: "blog updated successfully" })
    } catch (err) {
        console.log(err.message);
        logger.error(err);
        return res.status(500).json({ success: false, message: "something weng error" })
    }
}

export default editBlog