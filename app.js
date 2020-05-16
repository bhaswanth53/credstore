const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const session = require("express-session")
const passport = require("passport")
const flash = require("connect-flash")

const app = express()

// Initialize DotEnv
dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
let db = mongoose.connection;

// Check DB Connection
db.once("open", () => {
    console.log("DB Connected")
})

// Check DB errors
db.on("error", (err) => {
    console.log(err)
})

// Load View Engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator())

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

// Express messages middleware
app.use(require("connect-flash")())
app.use(function(req, res, next) {
    res.locals.messages = require("express-messages")(req, res)
    next()
})

// Passport config
require("./passport")(passport)
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Check user logged in
app.get("*", (req, res, next) => {
    res.locals.user = req.user || null
    next()
})

// Export and Use Router
const Routes = require("./routes/routes")
app.use("/", Routes)

// Serving assets
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uikit', express.static(path.join(__dirname + '/node_modules/uikit/dist/')));
app.use('/jquery', express.static(path.join(__dirname + '/node_modules/jquery/dist/')));
app.use("/datatables", express.static(path.join(__dirname + '/node_modules/datatables/media')))
app.use("/jquery-validation", express.static(path.join(__dirname + '/node_modules/jquery-validation/dist/')))
app.use("/axios", express.static(path.join(__dirname + '/node_modules/axios/dist/')))

const port = process.env.PORT || 8080

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})