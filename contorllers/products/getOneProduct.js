import product from "../../model/products/product.js";
import logger from '../../services/winston_logger.js';

async function getOneProduct(req, res) {
    try {
        const { productid } = req.headers;
        const theProduct = await product.findOne({ productId: productid })
            .select(["-_id", '-createdAt', "-updatedAt"])
        if (theProduct) {
            // Response
            return res.status(200).json({
                success: true,
                message: "Produc found successfully",
                data: theProduct,
            });
        } else {
            // Response
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }

    } catch (err) {

        logger.error(`Error in getAllProducts: ${err}`);
        return res.status(500).json({
            success: false,
            error: "Something went wrong. Please try again later.",
        });
    }
}

export default getOneProduct;
