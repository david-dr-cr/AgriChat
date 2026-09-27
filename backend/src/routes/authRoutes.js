const express = require('express');

const {
    register,
    login
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;
/** les deux route sont :
 * POST http://IP_DU_PC:5000/api/auth/register
 * POST http://IP_DU_PC:5000/api/auth/login  */