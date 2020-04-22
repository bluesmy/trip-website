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
  },

  postProduct: (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.description) {
      req.flash('error_messages', "所有欄位皆需填寫")
      return res.redirect('back')
    }
    return Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      type: req.body.type,
      state: req.body.state
    })
      .then(product => {
        req.flash('success_messages', 'Product was successfully created')
        res.redirect('/admin/products')
      })
  }
}

module.exports = adminController