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

exports.reset = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) throw err
        else {
            if(user) {
                res.render("auth/reset", {
                    hash_email: req.params.email,
                    id: req.params.id
                })
            } else {
                req.flash("error", "User not found")
                res.redirect("/login")
            }
        }
    })
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

exports.forgotPassword = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) {
            throw err
        } else {
            if(user) {
                let salt = bcrypt.genSaltSync(10)
                let emailHash = bcrypt.hashSync(req.body.email, salt)
                let url = process.env.APP_URL + "reset-password/" + user._id + "/" + emailHash

                let mailOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: req.body.email,
                    subject: "Forgor Password - Credstore",
                    html: `<h1>Forgot Password Request</h1><h2>Dear User, </h2><p>We have received reset password request for your account. Please click the link below to reset your password. <br/>${url}</p><p>Note: If you are not requested, then please ignore this email.</p>`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if(err) throw err
                    else {
                        req.flash("success", "Reset link has been sent to your email address")
                        res.redirect("/forgot-password")
                    }
                })
            } else {
                req.flash("error", "User not found with this email address")
                res.redirect("/forgot-password")
            }
        }
    })
}

exports.resetPassword = (req, res) => {
    bcrypt.compare(req.body.email, req.body.hash_email, (err, isMatch) => {
        if(err) throw err
        else {
            if(isMatch) {
                User.findById(req.body.hash_id, (err, user) => {
                    if(err) throw err
                    else {
                        if(user) {
                            let salt = bcrypt.genSaltSync(10)
                            let passwordHash = bcrypt.hashSync(req.body.password, salt)

                            let updated = {
                                password: passwordHash
                            }

                            User.updateOne({ _id: user._id }, updated, (err) => {
                                if(err) throw err
                                else {
                                    req.flash("success", "Your password has been reset. Please login to continue")
                                    res.redirect("/login")
                                }
                            })
                        } else {
                            req.flash("error", "User not found")
                            res.redirect("/login")
                        }
                    }
                })
            } else {
                let url = "/reset-password/" + res.body.hash_id + "/" + req.body.email
                req.flash("error", "Invalid email")
                res.redirect(url)
            }
        }
    })
}