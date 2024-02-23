import productDb from "../../../model/products/product.js"
import logger from "../../../services/winston_logger.js"
import cash from "../../../services/redis.js";
async function deleteProduct(req, res) {
    try {
        const { productId, confirmProductId } = req.body;
        if (!productId || !confirmProductId) {
            return res.status(404).json({ success: false, message: "require product id" })
        }
        console.log(productId);
        /// delete the product
        await productDb.deleteOne({ productId }, {new:true}).catch((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, message: "error while deleting product" })
            }
        })
        cash("del", "admin-all-products");
        return res.status(200).json({ success: true, message: "product deleted successfully" })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ success: false, message: "somthing error, try again later" })
    }
}
export default deleteProduct