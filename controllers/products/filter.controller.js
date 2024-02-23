import products from "../../model/products/product.js"
import logger from "../../services/winston_logger.js"

async function filterProducts(req, res) {
    try {
        let { color, category, price } = req.body;
        /// build the search query
        const query = {};
        if (color) {
            query.colors = { $in: [color] };
        }
        if (category) {
            query.productCategory = category;
        }
        if (price) {
            query.productPrice = { $lte: price };
        }
        const filteredProducts = await products.find(query).select(["-_id", "-__V", "-createdAt", "-updatedAt"]).lean()
        if (filteredProducts.length>0){
            return res.status(200).json({ success: true, filteredProducts })

        }else{
            return res.status(404).json({ success: false })

        }
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default filterProducts



