const express = require("express")

// Controllers
const SiteController = require("../controllers/site")
const AuthController = require("../controllers/auth")
const UserController = require("../controllers/user")
const CategoryController = require("../controllers/category")
const CredentialController = require("../controllers/credentials")

// Validators
const AuthValidator = require("../validation/auth")
const CategoryValidator = require("../validation/category")

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
router.post("/user/categories/add", [ensureAuth, CategoryValidator.addCategory], CategoryController.addCategory)

// Credential Routes
router.get("/user/credentials", CredentialController.listSites)
router.get("/user/credentials/:id", CredentialController.listCredentials)

// User Routes
router.get("/user/dashboard", ensureAuth, UserController.dashboard)

module.exports = router