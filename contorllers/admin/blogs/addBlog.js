import logger from "../../../services/winston_logger.js";
import Blog from "../../../model/blogs/blogs.js";
import uploadPhoto from "../../../services/uploadImagesToServer.js";
import idGenerator from "../../../services/idGenerator.js";
async function addBlog(req, res) {
    try {
        const { title, body } = req.body;
        const images = req.files;
        if (!images) {
            return res.status(404).json({ error: "Cover Image is required" })
        }
        let blog_id = idGenerator(5, false, false, true);
        let exist = true;
        while (exist) {
            let isExistBlog = await Blog.findOne({ blog_id });
            if (!isExistBlog) {
                exist = false;
            }
            blog_id = idGenerator(5, false, false, true);
        }
        const image_url = await uploadPhoto(images, `blogs/${blog_id}`)
        const newBlog = new Blog({
            title,
            body,
            CoverImage:image_url,
            blog_id,

        }).save();
        return res.status(200).json({ message: "Blog added successfully" })

    } catch (err) {
        logger.error(err)
      return  console.error(err.message)
    }
}
export default addBlog