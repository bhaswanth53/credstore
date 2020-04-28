const mongoose = require("mongoose")

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 191
    },
    user: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

let Category = module.exports = mongoose.model("category", categorySchema)