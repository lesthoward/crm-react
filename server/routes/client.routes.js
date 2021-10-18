const { Router } = require('express')
const router = Router()
const clientController = require('../controllers/client.controller')
const { isAuth } = require('../middleware/auth')

router.get('/client', 
    isAuth,
    clientController.getClients
)
router.post('/client', 
    isAuth,
    clientController.newClient
)
router.get('/client/:idClient',     
    isAuth,
    clientController.specificClient
)
router.put('/client/:idClient', 
    isAuth,
    clientController.updateClient
)
router.delete('/client/:idClient',     
    isAuth,
    clientController.deleteClient
)
module.exports = router