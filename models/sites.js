const mongoose = require("mongoose")

let siteSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    url: {
        type: String,
        maxlength: 600
    },
    description: {
        type: String,
        maxlength: 1000
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

let Site = module.exports = mongoose.model("site", siteSchema)