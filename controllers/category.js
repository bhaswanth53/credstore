// Import Category Model
const Category = require("../models/categories")

// Import Icons
const icons = require("../icons")

exports.viewCategories = (req, res) => {
    Category.find({ user: req.user._id }, (err, categories) => {
        if(err) throw err
        else {
            res.render("user/categories", {
                icons,
                categories
            })
        }
    })
}

exports.addCategory = (req, res) => {
    req.checkBody("name", "Category name is required").notEmpty()

    let errors = req.validationErrors()

    if(errors) {
        let url = req.header("Referer") || "/user/categories"

        for(var i=0; i<errors.length; i++) {
            req.flash("error", errors[i].msg)
        }

        res.redirect(url)
    } else {
        let category = new Category()
        category.user = req.user._id
        category.name = req.body.name
        category.icon = req.body.caticon
        category.save((err) => {
            if(err) throw err
            else {
                req.flash("success", "Category has been added successfully")
                res.redirect("/user/categories")
            }
        })
    }
}

exports.deleteCategory = (req, res) => {
    if(!req.user._id) {
        res.status(500).send()
    }
    else {
        let query = { _id: req.params.id }
        Category.findById(req.params.id, (err, category) => {
            if(err) {
                res.status(500).send()
            }
            else {
                if(category.user != req.user._id) {
                    res.status(500).send()
                } else {
                    Category.remove(query, (err) => {
                        if(err) {
                            res.status(500).send()
                        } else {
                            res.send("success")
                        }
                    })
                }
            }
        })
    }
}