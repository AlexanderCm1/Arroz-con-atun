const express = require('express');
const router = express.Router();
const concursoController = require('../Concurso/controller');
const { verifyToken, isComision, isProfessor } = require('../../middleware/authorization');




//GET
router.get('/api/v1/concursos', verifyToken, isComision, concursoController.getAll);
router.get('/api/v1/docentes/auxiliar', verifyToken, isComision, concursoController.getDocentesAuxiliar);
router.get('/api/v1/docentes/asociado', verifyToken, isComision, concursoController.getDocentesAsociado);
router.get('/api/v1/docentes/principal', verifyToken, isComision, concursoController.getDocentesPrincipal);


//POST
router.post('/api/v1/concursos/create', verifyToken, isComision, concursoController.create);
router.post('/api/v1/docentes/nomina', concursoController.addNomina);


//Update
router.put('/api/v1/concursos/create/basica/:id', verifyToken, isComision, concursoController.infoBasic);
router.put('/api/v1/concursos/create/concurso/:id', verifyToken, isComision, concursoController.concursoAdded);



module.exports = router;