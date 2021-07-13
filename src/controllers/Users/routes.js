const express = require('express');
const router = express.Router();
const userController = require('./controller');
const {verifyToken, isComision , isProfessor} = require('../../middleware/authorization');


router.get('/auth/verify', verifyToken, userController.verify)


router.post('/auth/register', userController.register );
router.post('/auth/login', userController.login );



module.exports = router;