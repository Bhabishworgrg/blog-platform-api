import mongoose from 'mongoose'
import dotnet from 'dotenv'

dotnet.config()

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI)
		console.log('Database connected.')
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
