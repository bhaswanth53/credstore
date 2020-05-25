const User = require("../models/users")
const bcrypt = require("bcryptjs")

exports.viewSettings = (req, res) => {
    res.render("user/settings")
}

exports.changePassword = (req, res) => {
    if(!req.user) {
        req.flash("error", "Please login")
        res.redirect("/login")
    } else {
        let old_password = req.body.old_password
        let new_password = req.body.new_password
        let confirm_password = req.body.confirm_password

        bcrypt.compare(old_password, req.user.password, (err, isMatch) => {
            if(isMatch) {
                let salt = bcrypt.genSaltSync(10)
                let passwordHash = bcrypt.hashSync(new_password, salt)
                let updated = {}
                updated.password = passwordHash
                let query = { _id: req.user._id }
                User.updateOne(query, updated, (err) => {
                    if(err) throw err
                    else {
                        req.flash("success", "Password has been changed successfully...!")
                        res.redirect("/user/settings")
                    }
                })
            } else {
                req.flash("error", "Incorrect old password")
                res.redirect("/user/settings")
            }
        })
    }
}