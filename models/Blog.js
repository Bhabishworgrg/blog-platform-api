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
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema)
