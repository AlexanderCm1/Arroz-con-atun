const express = require('express');
const router = express.Router();
const mercadoPagoController = require('./controller');


router.post('/api/v1/checkout', mercadoPagoController.checkout);
router.post('/api/v1/checkout/verified', mercadoPagoController.approved);



module.exports = router;
