const productController = require('../controllers/productController.js')
const userController = require('../controllers/userController.js')
const adminController = require('../controllers/adminController.js')

module.exports = app => {

  app.get('/', productController.getProducts)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/admin', (req, res) => res.redirect('/admin/products'))
  app.get('/admin/products', adminController.getProducts)

}