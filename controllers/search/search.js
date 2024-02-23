import logger from "../../services/winston_logger.js"
import product from "../../model/products/product.js"
import Blog from "../../model/blogs/blogs.js"
async function search(req, res) {
    try {
        const { search } = req.body;
        const productsSearch = await product.find({ $text: { $search: search } }).select(["-_id", "-__v", "-createdAt", "-updatedAt"]).lean();
        const blogsSearch = await Blog.find({ $text: { $search: search } }).select(["-_id", "-__v", "-createdAt", "-updatedAt"]).lean();

        return res.status(200).json({
            success: true,
            data: {
                blogs: blogsSearch.length,
                products: productsSearch.length,
                result: {
                    productsSearch,
                    blogsSearch
                }
            }
        })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something error, try again later" })
    }
}

export default search