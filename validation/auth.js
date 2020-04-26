exports.registerValidator = (req, res, next) => {
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
        /* const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError}) */
        res.render("auth/register", {
            errors
        })
    }
    // proceed to next middleware
    next()
}