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

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 10)
	next()
})

userSchema.methods.comparePassword = async function(inputPassword) {
	return await bcrypt.compare(inputPassword, this.password)
}

export default mongoose.model('User', userSchema)
