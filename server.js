require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')

// app initialization
const app = express()

// database connection
connectDB()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
const authRoutes = require('./routes/auth.route')
const documentsRoutes = require('./routes/document.route')
const userRoutes = require('./routes/user.route')

app.use('/api/v1', authRoutes)
app.use('/api/v1',documentsRoutes)
app.use('/api/v1', userRoutes)

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port: ${process.env.PORT}`))