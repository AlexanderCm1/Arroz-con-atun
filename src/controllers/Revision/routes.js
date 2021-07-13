const express = require('express');
const router = express.Router();
const revisionController = require('../Revision/controller');
const { verifyToken, isComision, isProfessor } = require('../../middleware/authorization');
router.get('/api/v1/comision/revision/legajos',verifyToken , isComision ,revisionController.getLegajo)


module.exports = router;