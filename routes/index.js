const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const productController = require('../controllers/productController.js')
const userController = require('../controllers/userController.js')
const adminController = require('../controllers/adminController.js')

module.exports = (app, passport) => {

  app.get('/', productController.getProducts)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)

  app.get('/admin', (req, res) => res.redirect('/admin/products'))
  app.get('/admin/products', adminController.getProducts)
  app.get('/admin/products/create', adminController.createProduct)
  app.post('/admin/products', upload.array('images'), adminController.postProduct)
  app.get('/admin/products/:id', adminController.getProduct)
  app.get('/admin/products/:id/edit', adminController.editProduct)
  app.put('/admin/products/:id', upload.array('images'), adminController.putProduct)
  app.delete('/admin/products/:id', adminController.deleteProduct)
  app.get('/admin/users', adminController.getUsers)
  app.put('/admin/users/:id', adminController.putUser)
}