export const validateRegister = (req, res, next) => {
	const { username, email, password } = req.body

	if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
		return res.status(400).json({
			message: 'Username, email and password are required and must be strings.'
		})
	}

	const usernameLength = username ? username.trim().length : 0
	if (usernameLength < 5 || usernameLength > 30) {
		return res.status(400).json({
			message: 'Username must be between 5 and 30 characters long.'
		})
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			message: 'Email is not valid.'
		})
	}

	const passwordLength = password ? password.trim().length : 0
	if (passwordLength < 8) {
		return res.status(400).json({
			message: 'Password must be atleast 8 characters long.'
		})
	}

	next()
}


export const validateLogin = (req, res, next) => {
	const { email, password } = req.body

	if (typeof email !== 'string' || typeof password !== 'string') {
		return res.status(400).json({
			message: 'Email and password must be strings.'
		})
	}

	if (!email || !password) {
		return res.status(400).json({
			message: 'Email and password are required.'
		})
	}

	next()
}
