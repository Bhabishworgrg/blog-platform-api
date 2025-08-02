import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 30,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	}
}, { timestamps: true })

export default mongoose.model('User', userSchema)
