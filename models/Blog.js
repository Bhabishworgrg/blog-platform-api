import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
})

export default mongoose.model('Blog', blogSchema)
