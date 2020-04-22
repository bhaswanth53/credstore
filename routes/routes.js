const express = require("express")
const SiteController = require("../controllers/site")
const AuthController = require("../controllers/auth")

const router = express.Router()

router.get("/", SiteController.homepage)

// Auth Routes
router.get("/login", AuthController.login)
router.get("/register", AuthController.register)
router.get("/forgot-password", AuthController.forgot)

module.exports = router