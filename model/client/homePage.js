import mongoose from "mongoose"
const homeShcema = new mongoose.Schema({
    heroImage: {
        imageURL: {
            type: String,
        },
        imageALT: {
            type: String
        },
        title: {
            type: String
        },
        actionButton: {
            text: {
                type: String,
            },
            URL: {
                type: String
            },
            bgColor: {
                type: String
            },
            textColor: {
                type: String
            }
        }
    },
    sales: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        imageURL: {
            type: String
        },
        actoionButton: {
            text: {
                type: String
            },
            URL: {
                type: String
            },
            bgColor: {
                type: String
            },
            textColor: {
                type: String
            }
        }
    },
    blogSection: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    },
    whyGreenGalaxy: {
        title: {
            type: String
        },
        description: {
            type: String
        }
    }
}, { timestamps: true })

const HomePageStyleDB = mongoose.model("homePageStyle", homeShcema);

export default HomePageStyleDB