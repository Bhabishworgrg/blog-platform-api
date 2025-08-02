import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
		required: true
	},
	content: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 500
	}
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema)
