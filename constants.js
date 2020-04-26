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