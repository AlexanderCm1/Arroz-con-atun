const express = require('express');
const router = express.Router();
const user = require('../controllers/Users/routes');
const uploads = require('../controllers/Uploads/routes');
const concurso = require('../controllers/Concurso/routes');
const mercadopago = require('../controllers/MercadoPago/routes');
const concursodocente = require('../controllers/ConcursoDocente/routes')
const legajos = require('../controllers/Legajos/routes')
const revision = require('../controllers/Revision/routes')

router.use('/', user);
router.use('/', concurso);
router.use('/', uploads);
router.use('/', mercadopago);
router.use('/', concursodocente);
router.use('/', legajos);
router.use('/', revision);
module.exports = router;