const express = require('express')
const router = express.Router()
// functions
const { getAllProducts } = require('../controllers/products')

router.route('/').get(getAllProducts)

module.exports = router