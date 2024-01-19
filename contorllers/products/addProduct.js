import product from "../../model/products/product.js";
import logger from '../../services/winston_logger.js'
import idGenerator from "../../services/idGenerator.js"
import uploadPhoto from "../../services/uploadImagesToServer.js";
async function addProduct(req, res) {
    ////////////////////////// handle it colors sizes and other varients are string 
    try {
        /// get req body variables
        const {
            productName,
            productPrice,
            productDescription,
            productCategory,
            productStock,
            productColors,
            productBrand,
            productOtherVarients,
            productSizes,

        } = req.body;
        const images = req.files;
        /// no images
        if (images.length == 0) {
            return res.status(404).json({ error: "Product Images required" })
        }
        /// generate productId
        const productId = idGenerator(10, true);
        /// upload images to cloudinary then remove from server 
        let images_urls = await uploadPhoto(images, `Green_Galaxy/products/ ${productId}}`);
        /// check if id exist
        let checkPrId = await product.findOne({ productId });
        while (checkPrId) {
            productId = idGenerator(10, true)
            checkPrId = await product.findOne({ productId });
        }
        //// all past new products set to false
        await product.updateMany({ isNew: true }, { isNew: false }, { new: true });
        /// make new product and save to db
        let newProduct = new product({
            productName: JSON.parse(productName),
            productPrice: JSON.parse(productPrice),
            productDescription: JSON.parse(productDescription),
            productCategory: JSON.parse(productCategory),
            productStock: JSON.parse(productStock),
            productBrand: JSON.parse(productBrand),
            productId,
            productImgs: images_urls,
            colors: JSON.parse(productColors),
            sizes: JSON.parse(productSizes),
            otherVarients: JSON.parse(productOtherVarients),
            newProduct:true,
            isMadeToOrder:true
        }).save();
        logger.info(`New Product added with id: ${productId}`)
        return res.status(200).json({ message: 'Product added successfully', newProduct })

    } catch (err) {
        logger.info(`error: ${err}`)
        return res.status(500).json({ error: "somthing went error, try again." })
    }
}

export default addProduct