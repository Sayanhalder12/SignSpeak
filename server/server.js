const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const gestureRoutes = require('./routes/gestureRoutes')

dotenv.config()

const app = express()
const PORT = 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/signspeak'

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/gesture', gestureRoutes)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message)
  })

app.listen(PORT, () => {
  console.log('Server running on port 5000')
})
