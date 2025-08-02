import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 10,
		maxlength: 100
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 100,
		maxlength: 10000
	},
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema)
