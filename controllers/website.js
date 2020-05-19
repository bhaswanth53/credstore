// Models
const Category = require("../models/categories")
const Website = require("../models/websites")

exports.listWebsites = (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) throw err
        else {
            Website.find({ user: req.user._id }, (err, websites) => {
                res.render("user/websites", {
                    categories,
                    websites
                })
            })
        }
    })
}

exports.addWebsite = (req, res) => {
    let website = new Website()
    website.user = req.user._id
    website.category = req.body.category
    website.name = req.body.name
    website.url = req.body.url
    website.description = req.body.description
    website.save((err) => {
        if(err) throw err
        else {
            req.flash("success", "Website has been added successfully")
            res.redirect("/user/websites")
        }
    })
}

exports.viewWebsite = (req, res) => {
    Website.findById(req.params.id, (err, website) => {
        if(err) throw err
        else {
            Category.findById(website.category, (err, category) => {
                if(err) throw err
                else {
                    res.render("user/website", {
                        website,
                        category
                    })
                }
            })
        }
    })
}

exports.editWebsite = (req, res) => {
    Website.findById(req.params.id, (err, website) => {
        if(err) throw err
        else {
            Category.find({}, (err, categories) => {
                if(err) throw err
                else {
                    res.render("user/editwebsite", {
                        website,
                        categories
                    })
                }
            })
        }
    })
}

exports.updateWebsite = (req, res) => {
    let site = {}
    site.category = req.body.category
    site.name = req.body.name
    site.url = req.body.url
    site.description = req.body.description
    Website.updateOne({ _id: req.params.id }, site, (err) => {
        if(err) throw err
        else {
            req.flash("success", "Website has been updated successfully")
            res.redirect("/user/websites")
        }
    })
}

exports.deleteWebsite = (req, res) => {
    if(!req.user) {
        res.status(500).send()
    } else {
        Website.remove({ _id: req.params.id }, (err) => {
            if(err) {
                res.status(500).send()
            } else {
                res.send("success")
            }
        })
    }
}