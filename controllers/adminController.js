const db = require('../models')
const Product = db.Product

const adminController = {
  getProducts: (req, res) => {
    return Product.findAll().then(products => {
      return res.render('admin/products', { products })
    })
  },

  createProduct: (req, res) => {
    return res.render('admin/create')
  }
}

module.exports = adminController