import products from "../../model/products/product.js"
import logger from "../../services/winston_logger.js"

async function filterProducts(req, res) {
    try {
        let { color, category, price } = req.body;
        if (color){
            let colorArr = await products.find({ productVarients:{colors:color}})
        }
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ error: "Something Error, please try again later." })
    }
}

export default filterProducts



