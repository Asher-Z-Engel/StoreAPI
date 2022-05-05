require('dotenv').config()
const connectDB = require('./connect')
const Product = require('../models/Product')
const sampleProducts = require('./products.json')

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany({})
    await Product.create(sampleProducts)
    process.exit(1)
  } catch (error) {
    console.log(error)
  }
}

populate()