import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    message_id: {
        type: String,
        required: true,

    },
    sender_name: {
        type: String,
        required: true
    },
    sender_email: {
        type: String,
        required: true
    },
    sender_phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ContactUsMsgs = mongoose.model("contactUsMsg", contactUsSchema);

export default ContactUsMsgs