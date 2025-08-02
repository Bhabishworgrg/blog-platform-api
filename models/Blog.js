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
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema)
