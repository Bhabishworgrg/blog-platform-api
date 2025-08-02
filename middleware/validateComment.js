const validateComment = (req, res, next) => {
	const { content } = req.body

	if (typeof content !== 'string') {
		return res.status(400).json({
			message: 'Comment must be a string.'
		})
	}

	const contentLength = content ? content.trim().length : 0
	if (contentLength < 1 || contentLength > 500) {
		return res.status(400).json({
			message: 'Comment must be between 1 and 500 characters long.'
		})
	}

	next()
}

export default validateComment

