const mongoose = require("mongoose")

let noteSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 350
    },
    content: {
        type: String,
        required: true,
        maxlength: 10000
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

let note = module.exports = mongoose.model("notes", noteSchema)