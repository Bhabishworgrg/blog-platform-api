import Comment from '../models/Comment.js'


export const createComment = async (req, res) => {
	const { blogId } = req.params
	const { content } = req.body

	try {
		const comment = new Comment({ 
			blog: blogId, 
			content: content,
			user: req.user.id
		})
		await comment.save()

		return res.status(201).json({
			message: `Comment #${ comment._id } created successfully.`,
			data: comment
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while creating the comment.'
		})
	}
}


export const getCommentsByBlog = async (req, res) => {
	const { blogId } = req.params

	const { search, sortBy, sortOrder } = req.query

	const query = { blog: blogId }

	if (search) {
		query.content = { $regex: search, $options: 'i' }
	}

	const sortOptions = { createdAt: -1 }
	if (sortBy) {
		const order = sortOrder === 'desc' ? -1 : 1
		sortOptions = { [sortBy]: order }
	}

	try {
		const comments = await Comment.find(query)
			.populate('user', 'username email')
			.sort(sortOptions)

		return res.status(200).json({
			message: `Comments for blog #${ blogId } retrieved successfully.`,
			data: comments
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while retrieving comments.'
		})
	}
}


export const updateComment = async (req, res) => {
	const { id } = req.params
	const { content } = req.body

	try {
		const comment = await Comment.findByIdAndUpdate(
			id,
			{ content: content }, 
			{ new: true, runValidators: true }
		)

		if (!comment) {
			return res.status(404).json({
				message: `Comment #${ id } not found.`
			})
		}

		return res.status(200).json({
			message: `Comment #${ id } updated successfully.`,
			data: comment
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: `${ id } is not a valid comment ID. Please check your input.`
			})
		}
		return res.status(500).json({
			message: 'An unexpected error occurred while updating the comment.'
		})
	}
}


export const deleteComment = async (req, res) => {
	const { id } = req.params

	try {
		const comment = await Comment.findByIdAndDelete(id)

		if (!comment) {
			return res.status(404).json({
				message: `Comment #${ id } not found.`
			})
		}

		return res.status(200).json({
			message: `Comment #${ id } deleted successfully.`
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: `${ id } is not a valid comment ID. Please check your input.`
			})
		}
		return res.status(500).json({
			message: 'An unexpected error occurred while deleting the comment.'
		})
	}
}
