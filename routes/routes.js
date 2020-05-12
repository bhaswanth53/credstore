const express = require("express")

// Controllers
const SiteController = require("../controllers/site")
const AuthController = require("../controllers/auth")
const UserController = require("../controllers/user")
const CategoryController = require("../controllers/category")
const CredentialController = require("../controllers/credentials")
const WebsiteController = require("../controllers/website")
const NotesController = require("../controllers/notes")

// Validators
const AuthValidator = require("../validation/auth")
const CategoryValidator = require("../validation/category")
const SiteValidator = require("../validation/site")

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
router.get("/user/credentials", ensureAuth, CredentialController.listSites)
router.get("/user/credentials/:id", ensureAuth, CredentialController.listCredentials)
router.post("/user/credentials/add", SiteValidator.addSite, CredentialController.addSite)
router.post("/user/credentials/:id/add", CredentialController.addCredential)

// Website Routes
router.get("/user/websites", ensureAuth, WebsiteController.listWebsites)
router.get("/user/websites/:id", ensureAuth, WebsiteController.viewWebsite)
router.post("/user/websites/add", WebsiteController.addWebsite)

// Notes Routes
router.get("/user/notes", ensureAuth, NotesController.listNotes)

// User Routes
router.get("/user/dashboard",UserController.dashboard)

module.exports = router