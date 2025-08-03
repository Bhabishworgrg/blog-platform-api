import Blog from '../models/Blog.js'


export const createBlog = async (req, res) => {
	const { title, description, tags } = req.body

	try {
		const blog = new Blog({
			title: title,
			description: description,
			tags: tags,
			user: req.user.id
		})
		await blog.save()

		return res.status(201).json({ 
			message: `Blog #${ blog._id } created successfully`,
			data: blog
		})
	} catch (error) {
		return res.status(500).json({ 
			message: 'An unexpected error occurred while creating the blog.'
		})
	}
}


export const getAllBlogs = async (req, res) => {
	const { search, tags, user, sortBy, sortOrder } = req.query

	const query = {}

	if (search) {
		query.$or = [
			{ title: { $regex: search, $options: 'i' } },
			{ description: { $regex: search, $options: 'i' } }
		]
	}

	if (tags) {
		query.tags = { $all: tags.split(',') }
	}

	if (user) {
		query.user = user
	}

	let sortOptions = { createdAt: -1 }
	if (sortBy) {
		const order = sortOrder === 'desc' ? -1 : 1
		sortOptions = { [sortBy]: order }
	}

	try {
		const blogs = await Blog.find(query)
			.populate('user', 'username email')
			.populate('tags', 'name')
			.sort(sortOptions)

		return res.status(200).json({ 
			message: 'Blogs retrieved successfully.',
			data: blogs
		})
	} catch (error) {
		return res.status(500).json({ 
			message: 'An unexpected error occurred while retrieving blogs.'
		})
	}
}


export const getBlog = async (req, res) => {
	const { id } = req.params

	try {
		const blog = await Blog.findById(id)
			.populate('user', 'username email')
			.populate('tags', 'name')

		if (!blog) {
			return res.status(404).json({ 
				message: `Blog #${ id } not found.`
			})
		}

		return res.status(200).json({ 
			message: `Blog #${ id } retrieved successfully.`,
			data: blog
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({ 
				message: `${ id } is not a valid blog ID. Please check your input.`
			})
		}

		return res.status(500).json({ 
			message: 'An unexpected error occurred while retrieving the blog.'
		})
	}
}


export const updateBlog = async (req, res) => {
	const { id } = req.params
	const { title, description, tags } = req.body

	try {
		const blog = await Blog.findByIdAndUpdate(
			id,
			{ title: title, description: description, tags: tags },
			{ new: true, runValidators: true }
		)

		if (!blog) {
			return res.status(404).json({ 
				message: `Blog #${ id } not found.`
			})
		}

		return res.status(200).json({ 
			message: `Blog #${ id } updated successfully.`,
			data: blog
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({ 
				message: `${ id } is not a valid blog ID. Please check your input.`
			})
		}

		return res.status(500).json({ 
			message: 'An unexpected error occurred while updating the blog.'
		})
	}
}


export const deleteBlog = async (req, res) => {
	const { id } = req.params

	try {
		const blog = await Blog.findByIdAndDelete(id)

		if (!blog) {
			return res.status(404).json({ 
				message: `Blog #${ id } not found.`
			})
		}

		return res.status(200).json({ 
			message: `Blog #${ id } deleted successfully.`,
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return res.status(400).json({ 
				message: `${ id } is not a valid blog ID. Please check your input.`
			})
		}

		return res.status(500).json({ 
			message: 'An unexpected error occurred while deleting the blog.'
		})
	}
}
