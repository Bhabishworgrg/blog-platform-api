import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 1,
		maxlength: 50
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}]
})

export default mongoose.model('Tag', tagSchema)
