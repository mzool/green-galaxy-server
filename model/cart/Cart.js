import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true
    },
    item: [{
        itemId: {
            type: String,
            required:true
        },
        productId: {
            type: String,
            ref: "product"
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
        purchased: {
            type: Boolean,
            default: false
        }
    }],
    user_id: {
        type: String,
        ref: "user",
        required: false
    },


}, { timestamps: true });
const CartDB = mongoose.model("cart", cartSchema);
export default CartDB