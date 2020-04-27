const nodemailer = require("nodemailer")

exports.transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        service: process.env.MAIL_SERVICE,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
})

// Ensure Auth Middleware
exports.ensureAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        req.flash("danger", "Please Login")
        res.redirect("/login")
    }
}

// Ensure Guest Middleware
exports.ensureGuest = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/user/dashboard")
    }
}