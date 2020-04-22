exports.login = (req, res) => {
    res.render("auth/login")
}

exports.register = (req, res) => {
    res.render("auth/register")
}

exports.forgot = (req, res) => {
    res.render("auth/forgot")
}