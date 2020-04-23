const multer = require('multer')
const upload = multer({
  dest: 'temp/',
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(null, false, req.flash('error_messages', '圖片上傳失敗，請上傳jpg/jpeg/png檔'))
    }
    cb(null, true)
  }
})

const productController = require('../controllers/productController.js')
const userController = require('../controllers/userController.js')
const adminController = require('../controllers/adminController.js')

module.exports = (app, passport) => {

  app.get('/', productController.getProducts)
  app.get('/products/:id', productController.getProduct)

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
  app.get('/admin/products/:id/images', adminController.getImages)
  app.put('/admin/products/:id/images/:image_id', adminController.putDefaultImage)
  app.delete('/admin/products/:id/images/:image_id', adminController.deleteImage)
  app.get('/admin/users', adminController.getUsers)
  app.put('/admin/users/:id', adminController.putUser)
}