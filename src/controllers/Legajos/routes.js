const express = require('express');
const router = express.Router();
const legajosController = require('../Legajos/controller');
const { verifyToken, isComision, isProfessor } = require('../../middleware/authorization');


router.get('/api/v1/legajos/modulos',  legajosController.getModulos);
router.get('/api/v1/legajos/modulos/:id', legajosController.getNombre)
router.get('/api/v1/legajos/submodulos/:id', verifyToken, isProfessor, legajosController.getSubModulos);

router.get('/api/v1/legajos/submodulos/puntaje/:idlegajos', legajosController.getModuloSuma);




router.get('/api/v1/legajos/formulario/:name', legajosController.getFormulario);
router.post('/api/v1/legajos/formulario/:name', legajosController.addFormulario);

//Update
router.put('/api/v1/legajos/formulario/puntaje/:idsubmodulo', legajosController.updatePuntaje);
router.put('/api/v1/legajos/formulario/puntaje/modulo/:idmodulo', legajosController.updatePuntajeModulos);
router.put('/api/v1/legajos/modulos/puntaje/submodulos/:id', legajosController.puntajeSubmodulos)
router.put('/api/v1/legajos/modulos/puntaje/legajos/:idlegajos', legajosController.putLegajos)

module.exports =router;

