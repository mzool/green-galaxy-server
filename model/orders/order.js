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
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
        discount: {
            type: Number
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
    order_id: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    order_status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed','Cancelled'],
        default: 'Pending',
    },
    paid: {
        type: Boolean,
        default: false,
    },
    deliveredOn: {
        type: String
    },
    detailedStatus: {
        type: String
    },

}, { timestamps: true });
const OrdersDB = mongoose.model("Order", order_schema);
export default OrdersDB