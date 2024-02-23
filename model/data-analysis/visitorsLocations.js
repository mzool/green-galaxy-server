import mongoose from "mongoose"

const locationsSchema = new mongoose.Schema({
    user_id:String,
    ip: String,
    city: String,
    country: String,
    region:String,
    loc: String,
    timezone: String,
    asn: {
        asn: String,
        name: String,
        route: String,
    },
    company: {
        name: String,
        domain: String,
    },
    carrier: {
        name: String,
        mcc: String,
        mnc: String
    },
    privacy: {
        vpn: Boolean,
        proxy: Boolean,
        tor: Boolean,
        relay: Boolean,
        hosting: Boolean,
        service: String
    },
    abuse: {
        address: String,
        country: String,
        email: String,
        network: String,
        name: String,
        phone: String
    },
    domains: {
        page: Number,
        total: Number,
    }
}, { timestamps: true });

const VisitorsLocations = new mongoose.model("VisitorLocation", locationsSchema);
export default VisitorsLocations