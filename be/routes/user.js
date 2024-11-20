const express = require('express')
const router = express.Router()
const { login,register,getAllUSer,getUserByEmail } = require('../controllers/user')

router.post('/login', login);
router.post('/register', register)
router.get('/getAllUser',getAllUSer)
router.get('/getUserByEmail',getUserByEmail)
module.exports = router