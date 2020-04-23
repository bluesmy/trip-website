const db = require('../models')
const Product = db.Product
const User = db.User
const Media = db.Media
const fs = require('fs')

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
    const { files, file } = req
    if (files) {
      Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status
      }).then(product => {
        files.map(file => {
          fs.readFile(file.path, (err, data) => {
            if (err) console.log('Error: ', err)
            fs.writeFile(`upload/${file.originalname}`, data, () => {
              Media.create({
                src: file ? `/upload/${file.originalname}` : null,
                ProductId: product.id,
                type: 'image'
              })
            })
          })
        })
        req.flash('success_messages', 'Product was successfully created')
        res.redirect('/admin/products')
      })
    } else if (file) {
      Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status
      }).then(product => {
        fs.readFile(file.path, (err, data) => {
          if (err) console.log('Error: ', err)
          fs.writeFile(`upload/${file.originalname}`, data, () => {
            Media.create({
              src: file ? `/upload/${file.originalname}` : null,
              ProductId: product.id,
              type: 'image'
            })
          })
        })
        req.flash('success_messages', 'Product was successfully created')
        res.redirect('/admin/products')
      })
    } else {
      return Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status
      }).then(product => {
        req.flash('success_messages', 'Product was successfully created')
        res.redirect('/admin/products')
      })
    }
  },

  getProduct: (req, res) => {
    Product.findByPk(req.params.id, {
      nest: true,
      raw: true,
      where: {
        status: "上架中"
      }
    }).then(product =>
      Media.findOne({
        nest: true,
        raw: true,
        where: {
          ProductId: req.params.id
        }
      }).then(media => {
        return res.render('admin/product', { product, media })
      })
    )
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
    const { files, file } = req
    if (files) {
      Product.findByPk(req.params.id).then(product => {
        product.update({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          type: req.body.type,
          status: req.body.status
        })
      }).then(product => {
        files.map(file => {
          fs.readFile(file.path, (err, data) => {
            if (err) console.log('Error: ', err)
            fs.writeFile(`upload/${file.originalname}`, data, () => {
              Media.create({
                src: file ? `/upload/${file.originalname}` : null,
                ProductId: req.params.id,
                type: 'image'
              })
            })
          })
        })
        req.flash('success_messages', 'Product was successfully updated')
        res.redirect('/admin/products')
      })
    } else if (file) {
      Product.findByPk(req.params.id).then(product => {
        product.update({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          type: req.body.type,
          status: req.body.status
        })
      }).then(product => {
        fs.readFile(file.path, (err, data) => {
          if (err) console.log('Error: ', err)
          fs.writeFile(`upload/${file.originalname}`, data, () => {
            Media.create({
              src: file ? `/upload/${file.originalname}` : null,
              ProductId: req.params.id,
              type: 'image'
            })
          })
        })
        req.flash('success_messages', 'Product was successfully updated')
        res.redirect('/admin/products')
      })
    } else {
      return Product.findByPk(req.params.id).then(product => {
        product.update({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          type: req.body.type,
          status: req.body.status
        })
      }).then(product => {
        req.flash('success_messages', 'Product was successfully updated')
        res.redirect('/admin/products')
      })
    }
  },

  deleteProduct: (req, res) => {
    return Product.findByPk(req.params.id)
      .then(product => {
        product.destroy()
          .then(product => {
            res.redirect('/admin/products')
          })
      })
  },

  getUsers: (req, res) => {
    User.findAll({ nest: true, raw: true })
      .then(users => {
        return res.render('admin/users', { users })
      })
  },

  putUser: (req, res) => {
    // 修改使用者為admin/user
    User.findByPk(req.params.id)
      .then(user => {
        if (user.role === 'admin') {
          user.update({
            role: 'user'
          })
        }
        else {
          user.update({
            role: 'admin'
          })
        }
      })
      .then(user => {
        req.flash('success_messages', '使用者身分已成功更新')
        res.redirect('/admin/users')
      })
  },

  getImages: (req, res) => {
    Media.findAll({
      nest: true,
      raw: true,
      where: {
        ProductId: req.params.id
      },
      include: [Product]
    }).then(media => {
      Product.findByPk(req.params.id, {
        nest: true,
        raw: true
      }).then(product => {
        return res.render('admin/images', { media, product })
      })
    })
  },

  putDefaultImage: (req, res) => {
    Media.findAll({
      where: {
        ProductId: req.params.id
      }
    }).then(media => {
      media.forEach(media => {
        media.update({
          isDefault: 0
        })
      })
    }).then(media => {
      Media.findByPk(req.params.image_id).then(media => {
        media.update({
          isDefault: 1
        })
      }).then(media => {
        req.flash('success_messages', '預設圖片已成功更新')
        res.redirect(`/admin/products/${req.params.id}/images`)
      })
    })
  }
}

module.exports = adminController