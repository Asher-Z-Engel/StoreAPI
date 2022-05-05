require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
// routes
const products = require('./routes/products')

app.use('/api/v1/products', products)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    .then(() => console.log('connected to the DB'))
    .catch((err) => console.log(err))
    app.listen(port, () => console.log(`Store API is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()