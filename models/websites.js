const mongoose = require("mongoose")

let websiteSchema = mongoose.Schema({
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
        required: true,
        maxlength: 1000
    },
    description: {
        type: String,
        maxlength: 1500
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

let Website = module.exports = mongoose.model("website", websiteSchema)