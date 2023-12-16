import mongoose from "mongoose";

const order_schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [{
        product_id: {
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
    }],
    cart_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending',
    }, 
    paid:{
        type:Boolean,
        default:false,
    }

}, { timestamps: true });
const OrdersDB = mongoose.model("Order", order_schema);
export default OrdersDB