const bcrypt = require("bcryptjs")
const securepin = require("secure-pin")
const passport = require("passport")

const { transporter } = require("../constants")

let User = require("../models/users")

exports.login = (req, res) => {
    res.render("auth/login")
}

exports.register = (req, res) => {
    res.render("auth/register")
}

exports.forgot = (req, res) => {
    res.render("auth/forgot")
}

exports.registerUser = (req, res) => {
    // User registration Algorithm
    // Store received form data
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let cpassword = req.body.password

    let newUser = new User({
        name: name,
        email: email,
        password: password,
        mpin: ""
    })

    // Generate Salt
    let salt = bcrypt.genSaltSync(10)
    // Hash the password
    let passwordHash = bcrypt.hashSync(newUser.password, salt)
    // Generate PIN
    let pin = securepin.generatePinSync(4)
    // Hash the PIN
    let pinHash = bcrypt.hashSync(pin, salt)

    // Assign hashed values to newUser
    newUser.password = passwordHash
    newUser.mpin = pinHash

    newUser.save((err) => {
        if(err) {
            console.log(err)
        }
        else {
            // Send mail to user
            let mailOptions = {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: "Verify Your Email - Credstore",
                html: `<p>Verify your email by clicking <a href="http://localhost:3000/user/verify-email/${email}">here</a>.</p><h3>Please note your pin: <span style="color: green">${pin}</span></h3><p>Note: Please do not share your pin to anyone</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Email sent " + info.response)
                }
            })
            // Display registered page
            res.render("auth/registered")
        }
    })
}

exports.verifyEmail = (req, res) => {
    // Email verification program
    User.findOne({email: req.params.email}, (err, user) => {
        if(err) {
            console.log(err)
        } else {
            if(user.status == 0) {
                let datetime = new Date()
                let updated = {}
                updated.status = 1
                updated.email_confirm = datetime
                let query = { _id: user._id }
                User.update(query, updated, { upsert: true }, (err) => {
                    if(err) throw err
                    else {
                        req.flash("success", "Email verified successfully, please login to continue.")
                        res.redirect("/login")
                    }
                })
            } else {
                req.flash("danger", "Please login to continue")
                res.redirect("/login")
            }
        }
    })
}

exports.loginUser = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/user/dashboard",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
}

exports.userLogout = (req, res) => {
    req.logout()
    req.flash("success", "You have been logged out")
    res.redirect("/login")
}