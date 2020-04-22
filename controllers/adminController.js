const db = require('../models')
const Product = db.Product

const adminController = {
  getProducts: (req, res) => {
    return Product.findAll().then(products => {
      return res.render('admin/products', { products })
    })
  }
}

module.exports = adminController