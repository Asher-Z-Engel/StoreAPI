const notFound = (req, res) => {
  res.status(404).json({success: false, msg: 'Resource not found...'})
}

module.exports = notFound