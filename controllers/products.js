const Product = require('../models/Product')

const getAllProductsTest = async (req, res) => {
  const products = await Product.find({ name: { $regex: 'desk', $options: 'i' } })
    .select('name price')
    .sort('name price')
  res.status(200).json({success: true, products, totalProducts: products.length})
}

const getAllProducts = async (req, res) => {
  const { featured, name, company, page, fields, sort, numericFilters } = req.query
  // query different properties
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured
  }
  if (company) {
    const companies = company.split(',')
    queryObject.company = companies
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (numericFilters) {
    const options = ['price', 'rating']
    const operatorMap = {
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
      '>': '$gt',
      '>=': '$gte'
    }
    const filters = numericFilters.split(',')
    const regex = /\b(<|<=|=|>|>=)\b/g
    filters.forEach(filter => {
      const newFilter = filter.replace(regex, (match) => `-${operatorMap[match]}-`)
      const [field, operator, value] = newFilter.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: value }
      }
    })
  }
  // filter search results based on other parameters
  let query = Product.find(queryObject)
  const limit = Number(req.query.limit) || 10
  query = query.limit(limit)
  if (page > 0) {
    query = query.skip(limit * (page - 1))
  }
  if (fields) {
    query = query.select(fields.split(',').join(' '))
  }
  if (sort) {
    const sortBy = sort.split(',').join(' ')
    query = query.sort(sortBy)
  }
  const products = await query
  res.status(200).json({success: true, products, totalProducts: products.length})
}

module.exports = {
  getAllProducts,
  getAllProductsTest
}