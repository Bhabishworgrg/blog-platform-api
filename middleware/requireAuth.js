import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/User.js'

dotenv.config()

const requireAuth = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({
			message: 'Invalid token. Please provide a valid authentication token.'
		})
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decodedToken.id).select('-password')

		if (!user) {
			return res.status(404).json({
				message: 'User not found.'
			})
		}

		req.user = user
		next()
	} catch (error) {
		return res.status(401).json({
			message: 'Invalid token. Please provide a valid authentication token.'
		})
	}
}

export default requireAuth
