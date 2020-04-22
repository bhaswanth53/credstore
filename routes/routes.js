const express = require("express")
const SiteController = require("../controllers/site")

const router = express.Router()

router.get("/", SiteController.homepage)

module.exports = router