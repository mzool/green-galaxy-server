import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productId: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImgs: [{
        type: String,
        required: true
    }],
    productCategory: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productStock: {
        type: Number,
        required: true,
    },
    productDiscount: {
        type: Number,
        default: 0,
    },
    availableCountries: [{
        type: String,
        default:["world"]
    }],
    productBrand: {
        type: String,
    },
    isMadeToOrder: {
        type: Boolean,
        default: true
    },

    colors: [{
        type: String,
        default: []

    }],
    sizes: [{
        type: String,
        default: []

    }],
    otherVarients: [{
        type: String,
        default: []

    }],
    newProduct: {
        type: Boolean,
        default: true
    },
    rating:{
        type:Number,
        default:0
    }

}, { timestamps: true });
// search 
productSchema.index({
    productName: "text",
    productDescription: "text",
    productBrand: "text",
    colors: "text",
    sizes: "text",
    otherVarients: "text",
    productCategory: "text",
    productPrice: "text"
})
const product = mongoose.model('product', productSchema);

export default product