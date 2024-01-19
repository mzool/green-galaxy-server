import mongoose from "mongoose";

const products_reviews_schema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    comment: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const ReviewsModel = mongoose.model("products_review", products_reviews_schema);

export default ReviewsModel