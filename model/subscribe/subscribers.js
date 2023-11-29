import mongoose from "mongoose";

//// create the schema
const subscribersSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    confrimEmail:{
        type:String,
        default: false
    }
},{timestamps:true});

const subscribers = new mongoose.model("subscriber",subscribersSchema);

export default subscribers