import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required:true
        },
        quantity: {
            type: Number,
            default: 1
        },
        color: {
            type: String
        },
        size: {
            type: String
        },
        otherVarients: {
            type: String
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
}, { timestamps: true });
const CartDB = mongoose.model("cart", cartSchema);
export default CartDB