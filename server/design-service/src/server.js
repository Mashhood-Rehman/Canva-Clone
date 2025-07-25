require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const designRoutes = require("./routes/design-routes")


const app = express()

const PORT = process.env.PORT || 5001


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('db connected')
}).catch((err) => console.log('error connecting db', err))



app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/designs", designRoutes)


async function startServer() {

    try {
        app.listen(PORT, () => {
            console.log('Design service is running on port ' + PORT)
        })
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1)

    }
}

startServer()