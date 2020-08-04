require('dotenv').config()
const express = require('express')
const cors = require('cors')

// app initialization
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
const authRoutes = require('./routes/auth')

app.use('/api/v1', authRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))