import logger from "../../services/winston_logger.js";
import Blog from "../../model/blogs/blogs.js";
import cach from "../../services/redis.js"
async function getAllBlogs(req, res) {
    try {
        // Parse query parameters for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        /// get cached items
        let cachedBlogs = await cach("get", `blog:${page}_limit:${limit}_blogs`);
        if (cachedBlogs) {
            return res.status(200).json({
                success: true,
                message: "Blogs fetched successfully",
                data: JSON.parse(cachedBlogs),
            });
        } else {
            const AllBlogs = await Blog.find({})
                .select(["-_id", '-createdAt', "-updatedAt"])
                .limit(limit)
                .skip(skip)
                .lean();
            /// save to cach
            await cach("set", `blog:${page}_limit:${limit}_blog`, JSON.stringify(AllBlogs), 30)
            // Response
            return res.status(200).json({
                success: true,
                message: "Blogs fetched successfully",
                data: AllBlogs,
            });
        }
    } catch (err) {
        logger.error(err)
        return console.log(err.message);
    }
}

export default getAllBlogs