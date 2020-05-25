const express = require("express")

// Controllers
const SiteController = require("../controllers/site")
const AuthController = require("../controllers/auth")
const UserController = require("../controllers/user")
const CategoryController = require("../controllers/category")
const CredentialController = require("../controllers/credentials")
const WebsiteController = require("../controllers/website")
const NotesController = require("../controllers/notes")
const SettingsController = require("../controllers/settings")

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
router.delete("/user/categories/:id", CategoryController.deleteCategory)

// Credential Routes
router.get("/user/credentials", ensureAuth, CredentialController.listSites)
router.get("/user/credentials/:id", ensureAuth, CredentialController.listCredentials)
router.post("/user/credentials/add", SiteValidator.addSite, CredentialController.addSite)
router.post("/user/credentials/:id/add", CredentialController.addCredential)
router.post("/user/get-credential", CredentialController.getCredential)
router.post("/user/credentials/edit/:id", CredentialController.editCredential)
router.delete("/user/delete-site/:id", CredentialController.deleteSite)
router.delete("/user/delete-cred/:id", CredentialController.deleteCredential)

// Website Routes
router.get("/user/websites", ensureAuth, WebsiteController.listWebsites)
router.get("/user/websites/:id", ensureAuth, WebsiteController.viewWebsite)
router.get("/user/websites/edit/:id", ensureAuth, WebsiteController.editWebsite)
router.post("/user/websites/add", WebsiteController.addWebsite)
router.post("/user/websites/edit/:id", WebsiteController.updateWebsite)
router.delete("/user/delete-website/:id", WebsiteController.deleteWebsite)

// Notes Routes
router.get("/user/notes", ensureAuth, NotesController.listNotes)
router.get("/user/notes/add", ensureAuth, NotesController.newNote)
router.get("/user/notes/:id", ensureAuth, NotesController.viewNote)
router.get("/user/notes/edit/:id", ensureAuth, NotesController.editNote)
router.post("/user/notes/add", NotesController.addNote)
router.post("/user/notes/edit/:id", NotesController.updateNote)
router.delete("/user/delete-note/:id", NotesController.deleteNote)

// Settings Routes
router.get("/user/settings", ensureAuth, SettingsController.viewSettings)
router.post("/user/change-password", SettingsController.changePassword)
router.post("/user/change-pin", SettingsController.changePin)

// User Routes
router.get("/user/dashboard",UserController.dashboard)

module.exports = router