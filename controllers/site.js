exports.homepage = (req, res) => {
    res.render("index")
}

exports.login = (req, res) => {
    res.render("auth/login")
}