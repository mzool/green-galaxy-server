import product from "../../../model/products/product.js";
import logger from "../../../services/winston_logger.js";
import cach from "../../../services/redis.js";
async function getAllProductsAdmin(req, res) {
    try {
        /// if the product cached before
        let cachedProduct = await cach("get", "admin-all-products");
        if (cachedProduct) {
            return res.status(200).json(JSON.parse(cachedProduct));

        }
        /// get all products
        const allProducts = await product.find({})
            .select(["-_id", '-createdAt', "-updatedAt"])
            .lean();
        await cach("set", "admin-all-products", JSON.stringify(allProducts), 60);
        return res.status(200).json(allProducts)
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later" })
    }
}

export default getAllProductsAdmin
