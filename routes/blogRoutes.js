import express from 'express'

import validateBlog from '../middleware/validateBlog.js'
import {
	createBlog, 
	getAllBlogs, 
	getBlog, 
	updateBlog, 
	deleteBlog 
} from '../controllers/blogController.js'

import validateComment from '../middleware/validateComment.js'
import {
	createComment,
	getCommentsByBlog
} from '../controllers/commentController.js'

import {
	getTagsByBlog
} from '../controllers/tagController.js'

import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.post('/', requireAuth, validateBlog, createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlog)
router.patch('/:id', requireAuth, validateBlog, updateBlog)
router.delete('/:id', requireAuth, deleteBlog)

router.post('/:blogId/comments', requireAuth, validateComment, createComment)
router.get('/:blogId/comments', getCommentsByBlog)

router.get('/:blogId/tags', getTagsByBlog)

export default router
