import express from 'express'

import validateBlog from '../middleware/validateBlog.js'
import {
	createBlog, 
	getAllBlogs, 
	getBlog, 
	updateBlog, 
	deleteBlog 
} from '../controllers/blogController.js'

const router = express.Router()

router.post('/', validateBlog, createBlog)
router.get('/', validateBlog, getAllBlogs)
router.get('/:id', validateBlog, getBlog)
router.put('/:id', validateBlog, updateBlog)
router.delete('/:id', validateBlog, deleteBlog)

export default router
