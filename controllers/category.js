const icons = require("../icons")

exports.viewCategories = (req, res) => {
    res.render("user/categories", {
        icons
    })
}