const bcrypt = require("bcryptjs")
const securepin = require("secure-pin")

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

    // Validate the form data
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

    // Check for validation errors
    let errors = req.validationErrors()
    if(errors) {
        // Re-render the register page if validation fails
        console.log(errors)
        res.render("auth/register", {
            errors
        })
    }
    else {
        // Create a new User instance if the validation was successful
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
                req.flash("success", "You are now registered successfully")
                res.redirect("/login")
            }
        })
    }
}