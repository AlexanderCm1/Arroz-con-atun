const express = require('express');
const router = express.Router();
const concursoDocente = require('../ConcursoDocente/controller');
const { verifyToken, isComision, isProfessor } = require('../../middleware/authorization');

router.get('/api/v1/docente/concurso/:id', verifyToken, isProfessor, concursoDocente.getConcursos)
router.post('/api/v1/docente/concurso/',  concursoDocente.addLegajos)


module.exports = router;