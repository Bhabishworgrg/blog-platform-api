import express from 'express'
import {
	createBlog, 
	getAllBlogs, 
	getBlog, 
	updateBlog, 
	deleteBlog 
} from '../controllers/blogController.js'

const router = express.Router()

router.post('/', createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router
