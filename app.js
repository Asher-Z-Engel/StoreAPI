require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const connectDB = require('./db/connect')
// routes
const products = require('./routes/products')
// errors
const notFound = require('./errors/NotFound')
const errorHandler = require('./errors/errorHandler')

app.use('/api/v1/products', products)

app.use(notFound)
app.use(errorHandler)

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