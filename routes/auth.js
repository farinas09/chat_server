/*
api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fields_validator');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').exists().isEmail(),
    check('password', 'Password is required').not().isEmpty().isLength({ min: 5 }),
    fieldValidator
] , createUser)


module.exports = router; 