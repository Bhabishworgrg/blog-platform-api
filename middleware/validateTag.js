const validateTag = (req, res, next) => {
	const { name } = req.body

	if (typeof name !== 'string') {
		return res.status(400).json({
			message: 'Tag name must be a string.'
		})
	}

	const nameLength = name ? name.trim().length : 0
	if (nameLength < 1 || nameLength > 50) {
		return res.status(400).json({
			message: 'Tag name must be between 1 and 50 characters long.'
		})
	}

	next()
}

export default validateTag
