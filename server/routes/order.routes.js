const { Router } = require('express')
const router = Router()
const orderController = require('../controllers/order.controller')

router.get('/order', orderController.getOrders)
router.post('/order', orderController.newOrder)
router.get('/order/:idOrder', orderController.specificOrder)
router.put('/order/:idOrder', orderController.updateOrder)
router.delete('/order/:idOrder', orderController.deleteOrder)

module.exports = router
