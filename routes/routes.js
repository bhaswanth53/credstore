const express = require("express")
const SiteController = require("../controllers/site")
const AuthController = require("../controllers/auth")
const UserController = require("../controllers/user")

const router = express.Router()

router.get("/", SiteController.homepage)

// Auth Routes
router.get("/login", AuthController.login)
router.get("/register", AuthController.register)
router.get("/forgot-password", AuthController.forgot)

// User Routes
router.get("/user/dashboard", UserController.dashboard)

module.exports = router