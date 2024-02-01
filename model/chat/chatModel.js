import mongoose from "mongoose";

const chat_schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    messages: [{
        text: {
            type: String
        },
        messageTime: {
            type: Date,
            default: Date.now
        },
    }]
}, { timestamps: true });

const ChatModel = mongoose.model("chat", chat_schema);

export default ChatModel