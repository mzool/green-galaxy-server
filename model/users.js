import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
    },
    user_id: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,

    },
    isAdmin: {
        type: String,
        enum: ["user", "superAdmin", "admin"],
        default: "user",

    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String
    },
    temporaryPassword: {
        type: String
    },
    towStepsLogin: {
        type: Boolean,
        default: false
    },
    userCountry: String

}, { timestamps: true });
const user = mongoose.model("user", userSchema)
export default user