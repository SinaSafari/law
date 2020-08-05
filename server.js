require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

// app initialization
const app = express()

// database connection
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

// routes
const authRoutes = require('./routes/auth.route')
const documentsRoutes = require('./routes/document.route')

app.use('/api/v1', authRoutes)
app.use('/api/v1',documentsRoutes)

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port: ${process.env.PORT}`))