const Cryptr = require("cryptr")
const bcrypt = require("bcryptjs")

// Models
const Category = require("../models/categories")
const Site = require("../models/sites")
const Credential = require("../models/credentials")
const User = require("../models/users")

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
            res.redirect("/user/credentials")
        }
    })
}

exports.editCredential = (req, res) => {
    // Password encrypt
    let password = req.body.password
    const cryptr = new Cryptr(process.env.APP_SECRET)
    let passhash = cryptr.encrypt(password)

    let credential = {}
    credential.username = req.body.username
    credential.email = req.body.email
    credential.mobile = req.body.mobile
    credential.password = passhash
    credential.add_info = req.body.add_info
    let query = { _id: req.params.id }
    Credential.updateOne(query, credential, (err) => {
        if(err) throw err
        else {
            req.flash("success", "Credential has been updated successfully")
            res.redirect("/user/credentials")
        }
    })
}

exports.getCredential = (req, res) => {
    if(!req.user) {
        res.status(206).send()
    } else {
        bcrypt.compare(req.body.mpin, req.user.mpin, (err, isMatch) => {
            if(err) {
                res.status(202).send()
            }
            if(isMatch) {
                Credential.findById(req.body.cred, (err, credential) => {
                    if(err) {
                        res.status(204).send()
                    } else {
                        const cryptr = new Cryptr(process.env.APP_SECRET)
                        let password = cryptr.decrypt(credential.password)
                
                        res.setHeader("Content-Type", "application/json");
                        res.status(200);
                        res.json({
                            id: credential._id,
                            username: credential.username,
                            email: credential.email,
                            mobile: credential.mobile,
                            password: password,
                            addinfo: credential.add_info
                        })
                    }
                })
            } else {
                res.status(205).send()
            }
        })
    }
}

exports.deleteSite = (req, res) => {
    if(!req.user) {
        res.status(500).send()
    } else {
        Site.findById(req.params.id, (err, site) => {
            if(site.user != req.user._id) {
                res.status(500).send()
            } else {
                Credential.remove({ site: site._id }, (err) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        Site.remove({ _id: req.params.id }, (err) => {
                            if(err) {
                                res.status(500).send()
                            } else {
                                res.send("Success")
                            }
                        })
                    }
                })
            }
        })
    }
}

exports.deleteCredential = (req, res) => {
    if(!req.user) {
        res.status(500).send()
    } else {
        Credential.findById(req.params.id, (err, credential) => {
            if(credential.user != req.user._id) {
                res.status(500).send()
            } else {
                Credential.remove({ _id: req.params.id }, (err) => {
                    if(err) {
                        res.status(500).send()
                    } else {
                        res.send("Success")
                    }
                })
            }
        })
    }
}