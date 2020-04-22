const productController = require('../controllers/productController.js')

module.exports = app => {

  app.get('/', productController.getProducts)

}