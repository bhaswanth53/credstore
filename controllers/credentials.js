// Models
const Category = require("../models/categories")
const Site = require("../models/sites")

exports.listSites = (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) throw err
        else {
            Site.find({}, (err, sites) => {
                if(err) throw err
                else {
                    res.render("user/credentials", {
                        categories,
                        sites
                    })
                }
            })
        }
    })
}

exports.listCredentials = (req, res) => {
    res.render("user/sitecred")
}

exports.addSite = (req, res) => {
    let site = new Site()
    site.user = req.user._id
    site.category = req.body.category
    site.name = req.body.name
    site.url = req.body.url
    site.description = req.body.description
    site.save((err) => {
        if(err) throw err
        else {
            req.flash("success", "Site has been added successfully")
            res.redirect("/user/credentials")
        }
    })
}