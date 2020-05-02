exports.addSite = (req, res, next) => {
    req.checkBody("category", "Please select a category").notEmpty()
    req.checkBody("name", "Please enter the name of the site").notEmpty()
    req.checkBody("name", "Name must not be longer than 191 characters").isLength({
        max: 191
    })
    req.checkBody("url", "Please enter the URL if the site").notEmpty()
    req.checkBody("url", "URL must not longer than 600 characters").isLength({
        max: 600
    })
    req.checkBody("description", "Description must not longer than 1000 characters").isLength({
        max: 1000
    })

    let errors = req.validationErrors()
    if(errors) {
        res.redirect("/user/credentials")
    }
    next()
}