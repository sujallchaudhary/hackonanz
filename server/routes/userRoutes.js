const express = require('express');
const router = express.Router();
const jwtP = require('../middlewares/jwtP');
const {userLogin,userRegister,verifyStudent} = require('../controllers/userController');
router.post('/login', userLogin);
router.post('/signup',userRegister);
router.get('/verify/:id',jwtP,verifyStudent);
module.exports = router;