import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import blogRoutes from './routes/blogRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import tagRoutes from './routes/tagRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/comments', commentRoutes)
app.use('/api/v1/tags', tagRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/', (_, res) => 
	res.send('Welcome to Blog API')
)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'http://localhost'
app.listen(PORT, () => 
	console.log(`Server is running at ${HOST}:${PORT}`)
)
