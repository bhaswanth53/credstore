const bcrypt = require("bcryptjs")

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
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let cpassword = req.body.password

    // Validation
    req.checkBody("name", "Name is required").notEmpty()
    req.checkBody("name", "Name must be shorter than 191 characters").isLength({
        max: 191
    })
    req.checkBody("email", "Email is required").notEmpty()
    req.checkBody("email", "Email is invalid").isEmail()
    req.checkBody("email", "Email must be less than 255 characters").isLength({
        max: 255
    })
    req.checkBody("password", "Password is required").notEmpty()
    req.checkBody("password", "Password must be between 8 to 32 characters").isLength({
        min: 8,
        max: 32
    })
    req.checkBody("cpassword", "Passwords are not matching").equals(req.body.password)

    let errors = req.validationErrors()
    if(errors) {
        res.render("auth/register", {
            errors
        })
    }
    else {
        let newUser = new User({
            name: name,
            email: email,
            password: password
        })

        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                console.log(err)
            }
            else {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        console.log(err)
                    } else {
                        newUser.password = hash
                        newUser.save((err) => {
                            if(err) {
                                console.log(err)
                                return
                            } else {
                                req.flash("success", "You are now registered successfully")
                                res.redirect("/login")
                            }
                        })
                    }
                })
            }
        })
    }
}