const express = require('express');
const router = express.Router();
const userController = require('./controller')

router.get('/:filter', (req, res, next) => userController.getUsers(req, res, next))
router.post('/', (req, res, next) => userController.createUser(req, res, next))
router.patch('/:id', (req, res, next) => userController.updateUser(req, res, next))
router.delete('/:id', userController.deleteUser)

module.exports = router;
