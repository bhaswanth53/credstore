const express = require("express")
const SiteController = require("../controllers/site")

const router = express.Router()

router.get("/", SiteController.homepage)

// Auth Routes
router.get("/login", SiteController.login)

module.exports = router