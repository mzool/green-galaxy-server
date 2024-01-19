import productDB from "../../../model/products/product.js";
import logger from "../../../services/winston_logger.js";
import uploadPhoto from "../../../services/uploadImagesToServer.js";
const availableChanges = ["productName", "productDescription", "productPrice", "productStock", "productCategory", "productDiscount",
    "productBrand", "availableCountries", "colors", "sizes", "otherVarients", "newProduct", "isMadeToOrder", "productId", "deleteExistingImages"]
async function editProduct(req, res) {
    try {
        /// first get admin inputs
        const newData = req.body;
        const images = req.files;
        let imagesURLs;
        if (images?.length > 0) {
            imagesURLs = await uploadPhoto(images, `Green_Galaxy/products/${newData.productId}}`);

        }
        if (!newData.productId) {
            return res.status(404).json({ success: false, message: "provide product id" })
        }
        const theProduct = await productDB.findOne({ productId: newData.productId });
        if (!theProduct) {
            return res.status(404).json({ success: false, message: "product not found" })
        }
        for (const k in newData) {
            if (!availableChanges.includes(k)) {
                return res.status(404).json({ success: false, message: "unAllowed changes" })
            }
            if (Array.isArray(newData[k]) && newData[k].length > 0) {
                theProduct[k] = newData[k];

            }
            if (newData[k] && !Array.isArray(newData[k])) {
                theProduct[k] = newData[k];
            }
            if (imagesURLs?.length > 0) {
                if (newData.deleteExistingImages) {
                    theProduct["productImgs"] = imagesURLs

                } else {
                    theProduct["productImgs"].push(...imagesURLs)
                }
            }
        }
        /// save the new data to DB
        await theProduct.save();
        res.status(200).json({ success: true, message: "product updated successfully" })
    } catch (err) {
        logger.error(err);
        console.log(err.message);
        return res.status(500).json({ error: "Something Error, try again later." })
    }
}

export default editProduct

