const db = require('../models')
const Product = db.Product
const Media = db.Media

const productController = {
  getProducts: (req, res) => {
    Product.findAll({
      nest: true,
      raw: true,
      where: {
        status: "上架中"
      },
      include: {
        model: Media,
        where: {
          isDefault: 1
        }
      }
    }).then(products => {
      return res.render('index', { products })
    })
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
        return res.render('product', { product, media })
      })
    )
  }
}

module.exports = productController