const { Router } = require('express')
const { multerSingle } = require('../helpers/re-use.helper')
const router = Router()
const productController = require('../controllers/products.controller')

// CRUD
router.get('/product', productController.getProducts)

router.post('/product', 
    (req, res, next) => multerSingle(req, res, next, ['jpg', 'png', 'jpeg'], 'product'),
    productController.newProduct
)

router.get('/product/:idProduct', productController.specificProduct)
router.put('/product/:idProduct', 
    (req, res, next) => multerSingle(req, res, next, ['jpg', 'png', 'jpeg'], 'product'),
    productController.updateProduct
)
router.delete('/product/:idProduct', productController.removeProduct)

// PRODUCT SEARCH
router.post('/product/search/:query', productController.searchProduct)

module.exports = router