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
        required: true,
    }],
    productBrand: {
        type: String,
    },

    colors: [{
        type: String,
        default:[]

    }],
    sizes: [{
        type: String,
        default: []

    }],
    otherVarients: [{
        type: String,
        default: []

    }]

}, { timestamps: true });

const product = mongoose.model('product', productSchema);

export default product