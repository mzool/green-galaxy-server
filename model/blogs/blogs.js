import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        required: true,
        default: true
    },
    CoverImage: [{
        type: String,
        required: true
    }],
    blog_id:{
        type: String,
        required: true
    },
    comments: [{
        user_name: {
            type: String,
            required: true
        },
        user_email: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        }

    }]
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema);
export default Blog