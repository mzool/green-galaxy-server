import product from "../../model/products/product.js";
import logger from '../../services/winston_logger.js';
import cach from '../../services/redis.js';
async function getAllProducts(req, res) {
    try {
        // Parse query parameters for pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        /// get cached items
        let cachedProduct = await cach("get", `page:${page}_limit:${limit}_products`);
        if (cachedProduct) {
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                data: JSON.parse(cachedProduct),
            });
        } else {
            const allProducts = await product.find({})
                .select(["-_id", '-createdAt', "-updatedAt"])
                .limit(limit)
                .skip(skip)
                .lean();
            /// save to cach
            await cach("set", `page:${page}_limit:${limit}_products`, JSON.stringify(allProducts), 30)
            // Response
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                data: allProducts,
            });
        }

    } catch (err) {
        console.log(err.message);
        logger.error(`Error in getAllProducts: ${err}`);
        return res.status(500).json({
            success: false,
            error: "Something went wrong. Please try again later.",
        });
    }
}

export default getAllProducts;
