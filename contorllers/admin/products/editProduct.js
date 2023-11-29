import product from "../../../model/products/product.js";
import logger from "../../../services/winston_logger.js";

async function editProduct(req, res) {
    try {

/// first get admin inputs
/// validate admin inputs
/// get the product from the id
/// delete images on cloudinary if the images edited
/// edit the product
/// response

        res.status(200).json({ message: "success" })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later." })
    }
}

export default editProduct