const db = require('../models')
const Product = db.Product

const adminController = {
  getProducts: (req, res) => {
    return Product.findAll({ nest: true, raw: true }).then(products => {
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
      status: req.body.status
    })
      .then(product => {
        req.flash('success_messages', 'Product was successfully created')
        res.redirect('/admin/products')
      })
  },

  getProduct: (req, res) => {
    return Product.findByPk(req.params.id, { nest: true, raw: true }).then(product => {
      return res.render('admin/product', { product })
    })
  },

  editProduct: (req, res) => {
    return Product.findByPk(req.params.id, { nest: true, raw: true }).then(product => {
      return res.render('admin/create', { product })
    })
  },

  putProduct: (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.description) {
      req.flash('error_messages', "所有欄位皆需填寫")
      return res.redirect('back')
    }
    return Product.findByPk(req.params.id).then(product => {
      product.update({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status
      })
    })
      .then(product => {
        req.flash('success_messages', 'Product was successfully updated')
        res.redirect('/admin/products')
      })
  },

  deleteProduct: (req, res) => {
    return Product.findByPk(req.params.id)
      .then(product => {
        product.destroy()
          .then(product => {
            res.redirect('/admin/products')
          })
      })
  }
}

module.exports = adminController