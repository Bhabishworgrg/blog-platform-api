import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (_, res) => 
	res.send('Welcome to Blog API')
)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'http://localhost'
app.listen(PORT, () => 
	console.log(`Server is running at ${HOST}:${PORT}`)
)
