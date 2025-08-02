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

import validateTag from '../middleware/validateTag.js'
import {
	getTagsByBlog
} from '../controllers/tagController.js'

const router = express.Router()

router.post('/', validateBlog, createBlog)
router.get('/', validateBlog, getAllBlogs)
router.get('/:id', validateBlog, getBlog)
router.patch('/:id', validateBlog, updateBlog)
router.delete('/:id', validateBlog, deleteBlog)

router.post('/:blogId/comments', validateComment, createComment)
router.get('/:blogId/comments', validateComment, getCommentsByBlog)

router.get('/:blogId/tags', validateTag, getTagsByBlog)

export default router
