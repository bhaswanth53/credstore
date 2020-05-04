const Cryptr = require("cryptr")

// Models
const Category = require("../models/categories")
const Site = require("../models/sites")
const Credential = require("../models/credentials")

exports.listSites = (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) throw err
        else {
            Site.find({ user: req.user._id }, (err, sites) => {
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
    Site.findById(req.params.id, (err, site) => {
        if(err) throw err
        else {
            Category.findById(site.category, (err, category) => {
                if(err) throw err
                else {
                    Credential.find({
                        user: req.user._id,
                        site: req.params.id
                    }, (err, credentials) => {
                        if(err) throw err
                        else {
                            res.render("user/sitecred", {
                                site, 
                                category,
                                credentials
                            })
                        }
                    })
                }
            })
        }
    })
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

exports.addCredential = (req, res) => {
    // Password encrypt
    let password = req.body.password
    const cryptr = new Cryptr(process.env.APP_SECRET)
    let passhash = cryptr.encrypt(password)

    let credential = new Credential()
    credential.user = req.user._id
    credential.site = req.params.id
    credential.username = req.body.username
    credential.email = req.body.email
    credential.mobile = req.body.mobile
    credential.password = passhash
    credential.add_info = req.body.add_info
    credential.save((err) => {
        if(err) throw err
        else {
            req.flash("success", "Credential has been added successfully")
            res.redirect("/user/credentials/"+req.params.id)
        }
    })
}