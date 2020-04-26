const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 191
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    profile_pic: {
        type: String,
        maxlength: 191
    },
    mpin: {
        type: String,
        required: true
    },
    email_confirm: {
        type: Date
    },
    status: {
        type: Number,
        default: 0
    }
})

let User = module.exports = mongoose.model("user", userSchema)