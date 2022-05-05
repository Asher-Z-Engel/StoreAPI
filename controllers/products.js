const getAllProducts = async (req, res) => {
  res.status(200).json({success: true, products: 'All products'})
}

module.exports = {
  getAllProducts
}