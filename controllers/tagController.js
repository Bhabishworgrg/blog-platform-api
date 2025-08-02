import Tag from '../models/Tag.js'


export const createTag = async (req, res) => {
	const { name } = req.body

	try {
		const tag = new Tag({ 
			name: name 
		})
		await tag.save()

		return res.status(201).json({
			message: `Tag #${tag._id} created successfully.`,
			data: tag
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while creating the tag.'
		})
	}
}


export const getAllTags = async (_, res) => {
	try {
		const tags = await Tag.find().sort({ createdAt: -1 })

		return res.status(200).json({
			message: 'Tags retrieved successfully.',
			data: tags
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while retrieving tags.'
		})
	}
}


export const getTagsByBlog = async (req, res) => {
	const { blogId } = req.params

	try {
		const tags = await Tag.find({ blogs: blogId }).sort({ createdAt: -1 })

		return res.status(200).json({
			message: `Tags for blog #${blogId} retrieved successfully.`,
			data: tags
		})
	} catch (error) {
		return res.status(500).json({
			message: 'An unexpected error occurred while retrieving tags.'
		})
	}
}


export const updateTag = async (req, res) => {
	const { id } = req.params
	const { name } = req.body

	try {
		const tag = await Tag.findByIdAndUpdate(
			id,
			{ name: name },
			{ new: true, runValidators: true }
		)

		if (!tag) {
			return res.status(404).json({
				message: `Tag #${id} not found.`
			})
		}

		return res.status(200).json({
			message: `Tag #${id} updated successfully.`,
			data: tag
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: `${id} is not a valid tag ID. Please check your input.`
			})
		}

		return res.status(500).json({
			message: 'An unexpected error occurred while updating the tag.'
		})
	}
}


export const deleteTag = async (req, res) => {
	const { id } = req.params

	try {
		const tag = await Tag.findByIdAndDelete(id)

		if (!tag) {
			return res.status(404).json({
				message: `Tag #${id} not found.`
			})
		}

		return res.status(200).json({
			message: `Tag #${id} deleted successfully.`,
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({
				message: `${id} is not a valid tag ID. Please check your input.`
			})
		}

		return res.status(500).json({
			message: 'An unexpected error occurred while deleting the tag.'
		})
	}
}
