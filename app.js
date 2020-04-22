const express = require("express")
const dotenv = require("dotenv")
const path = require("path")

const app = express()

// Initialize DotEnv
dotenv.config()

// Load View Engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Export and Use Router
const Routes = require("./routes/routes")
app.use("/", Routes)

// Serving assets
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uikit', express.static(path.join(__dirname + '/node_modules/uikit/dist/')));

const port = process.env.PORT || 8080

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})