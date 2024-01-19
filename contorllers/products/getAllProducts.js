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
        let cachedProducts = await cach("get", "all_products");
        if (cachedProducts) {
            let itemsToSend = JSON.parse(cachedProducts).slice(skip, limit * page);
            return res.status(200).json({ success: true, products: itemsToSend })
        }
        //// get all products and cach them
        const allProducts = await product.find({})
            .select(["-_id", '-createdAt', "-updatedAt", "-__v"]).lean();
        /// save all products to cach
        await cach("set", "all_products", JSON.stringify(allProducts), 30);
        const itemsToSend = allProducts.slice(skip, limit);
        //// response
        return res.status(200).json({ success: true, products: itemsToSend })
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
