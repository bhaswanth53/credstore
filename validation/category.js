exports.addCategory = (req, res, next) => {
    req.checkBody("name", "Name is required").notEmpty()
    req.checkBody("name", "Name must not exceed more than 191 characters").isLength({
        max: 191
    })
    req.checkBody("caticon", "Icon length exceeded").isLength({
        max: 191
    })

    let errors = req.validationErrors()
    if(errors) {
        res.redirect('/user/categories')
    }
    next()
}