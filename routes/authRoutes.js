import express from 'express'

import {
	registerUser,
	loginUser
} from '../controllers/authController.js'

import {
	validateRegister,
	validateLogin
} from '../middleware/validateAuth.js'

const router = express.Router()

router.post('/register', validateRegister, registerUser)
router.post('/login', validateLogin, loginUser)

export default router
