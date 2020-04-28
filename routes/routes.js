const express = require("express")

// Controllers
const SiteController = require("../controllers/site")
const AuthController = require("../controllers/auth")
const UserController = require("../controllers/user")
const CategoryController = require("../controllers/category")

// Validators
const AuthValidator = require("../validation/auth")

//Middlewares
const { ensureAuth, ensureGuest } = require("../constants")

const router = express.Router()

router.get("/", SiteController.homepage)

// Auth Routes
router.get("/login", ensureGuest, AuthController.login)
router.get("/register", ensureGuest, AuthController.register)
router.get("/forgot-password", ensureGuest, AuthController.forgot)
router.get("/user/verify-email/:email", AuthController.verifyEmail)
router.get("/logout", ensureAuth, AuthController.userLogout)

router.post("/register", AuthValidator.registerValidator, AuthController.registerUser)
router.post("/login", AuthController.loginUser)

// Category Routes
router.get("/user/categories", ensureAuth, CategoryController.viewCategories)

// User Routes
router.get("/user/dashboard", ensureAuth, UserController.dashboard)

module.exports = router