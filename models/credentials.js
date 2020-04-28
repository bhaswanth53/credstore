const mongoose = require("mongoose")

let credentialSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    username: {
        type: String,
        maxlength: 191
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    mobile: {
        type: String,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    },
    add_info: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

let Credential = module.exports = mongoose.model("credential", credentialSchema)