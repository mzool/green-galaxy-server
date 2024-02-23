import mongoose from "mongoose";

const returnSchema = new mongoose.Schema({
    id: {
        type: String
    },
    dateOfInitiate: {
        type: Date,
        default: new Date
    },
    order_id: {
        type: String,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userEmail: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    returnShipping: {
        cost: Number,
        address: String,
        method: String
    },
    images: [{
        type: String
    }],
    condition: {
        type: String,
        enum: ["damaged", "new", "used", "opened"]
    },
    refund: {
        value: Number,
        date: Date,
        method: String,
        refundType: {
            method: String,
            enum: ["refund", "exchange", "store_credit"]
        }
    },
    notes: {
        customerNotes: String,
        adminNotes: String
    }

}, { timestamps: true });

const ReturnsDB = mongoose.model("Return", returnSchema);

export default ReturnsDB