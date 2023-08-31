const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const path = require("path")

const userRoutes = require("./routes/userRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/users", userRoutes)

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, "client/dist")))
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    )
} else {
    app.get("/", (req, res) => {
        res.send("Fala rapaziada")
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
