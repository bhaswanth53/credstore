const User = require("../models/users")
const bcrypt = require("bcryptjs")
const securepin = require("secure-pin")

const { transporter } = require("../constants")

exports.viewSettings = (req, res) => {
    res.render("user/settings")
}

exports.changePassword = (req, res) => {
    if(!req.user) {
        req.flash("error", "Please login")
        res.redirect("/login")
    } else {
        let old_password = req.body.old_password
        let new_password = req.body.new_password
        let confirm_password = req.body.confirm_password

        bcrypt.compare(old_password, req.user.password, (err, isMatch) => {
            if(isMatch) {
                let salt = bcrypt.genSaltSync(10)
                let passwordHash = bcrypt.hashSync(new_password, salt)
                let updated = {}
                updated.password = passwordHash
                let query = { _id: req.user._id }
                User.updateOne(query, updated, (err) => {
                    if(err) throw err
                    else {
                        req.flash("success", "Password has been changed successfully...!")
                        res.redirect("/user/settings")
                    }
                })
            } else {
                req.flash("error", "Incorrect old password")
                res.redirect("/user/settings")
            }
        })
    }
}

exports.changePin = (req, res) => {
    if(!req.user) {
        req.flash("error", "Please login")
        res.redirect("/login")
    } else {
        let old_pin = req.body.old_pin
        let new_pin = req.body.new_pin
        let confirm_pin = req.body.confirm_pin

        bcrypt.compare(old_pin, req.user.mpin, (err, isMatch) => {
            if(isMatch) {
                let salt = bcrypt.genSaltSync(10)
                let pinHash = bcrypt.hashSync(new_pin, salt)
                let updated = {
                    mpin: pinHash
                }
                let query = { _id: req.user._id }

                User.updateOne(query, updated, (err) => {
                    if(err) throw err
                    else {
                        req.flash("success", "MPIN has been changed successfully")
                        res.redirect("/user/settings")
                    }
                })
            } else {
                req.flash("error", "Incorrect old pin")
                res.redirect("/user/settings")
            }
        })
    }
}

exports.generatePin = (req, res) => {
    if(!req.user) {
        res.status(500).send()
    } else {
        let salt = bcrypt.genSaltSync(10)
        let pin = securepin.generatePinSync(4)
        let pinHash = bcrypt.hashSync(pin, salt)
        let updated = {
            mpin: pinHash
        }
        let query = { _id: req.user._id }
        User.updateOne(query, updated, (err) => {
            if(err) {
                res.status(500).send()
            } else {
                let mailOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: req.user.email,
                    subject: "New MPIN Generated - Credstore",
                    html: `<h1>New MPIN Generated</h1><p>Your new MPIN has been generated successfully. Please check the new MPIN below.</p><h3>${pin}</h3>`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        res.send("success")
                    }
                })
            }
        })
    }
}