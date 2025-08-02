import User from '../models/User.js'

export const registerUser = async (req, res) => {
	const { username, email, password } = req.body

	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(409).json({
				message: 'Email already registered. Please use a different email.'
			})
		}

		const user = new User({
			username: username,
			email: email,
			password: password
		})
		await user.save()

		return res.status(201).json({
			message: 'User registered successfully.'
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while registering the user.'
		})
	}
}


export const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({
				message: 'Invalid email or password. Please try again.'
			})
		}

		const isPasswordValid = await user.comparePassword(password)
		if (!isPasswordValid) {
			return res.status(401).json({
				message: 'Invalid email or password. Please try again.'
			})
		}

		return res.status(200).json({
			message: 'Login successful.'
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while logging in.'
		})
	}
}
