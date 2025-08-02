import express from 'express'

const app = express()

app.get('/', (_, res) => 
	res.send('Welcome to Blog API')
)

const PORT = 3000
const HOST = 'http://localhost'
app.listen(3000, () => 
	console.log(`Server is running at ${HOST}:${PORT}`)
)
