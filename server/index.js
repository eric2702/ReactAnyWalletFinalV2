const express = require('express')
const app = express()
const cors = require("cors")

//middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//routes

//register and login routes

app.use("/auth", require("./routes/jwtAuth"))
app.use("/dashboard", require("./routes/dashboard"))


app.listen(5000, () => {
    console.log("Server running on port 5000")
})