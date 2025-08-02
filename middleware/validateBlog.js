const validateBlog = (req, res, next) => {
	const { title, description } = req.body

	if (typeof title !== 'string' || typeof description !== 'string') {
		return res.status(400).json({
			message: 'Title and description must be strings.'
		})
	}

	const titleLength = title ? title.trim().length : 0
	if (titleLength < 10 || titleLength > 100) {
		return res.status(400).json({
			message: 'Title must be between 10 and 100 characters long.'
		})
	}

	const descriptionLength = description ? description.trim().length : 0
	if (descriptionLength < 100 || descriptionLength > 10000) {
		return res.status(400).json({
			message: 'Description must be between 100 and 10,000 characters long.'
		})
	}

	next()
}

export default validateBlog
