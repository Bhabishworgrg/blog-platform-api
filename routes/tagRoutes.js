import express from 'express'

import validateTag from '../middleware/validateTag.js'
import {
	createTag,
	getAllTags,
	updateTag,
	deleteTag
} from '../controllers/tagController.js'

import validateBlog from '../middleware/validateBlog.js'
import {
	getBlogsByTag
} from '../controllers/blogController.js'

const router = express.Router()

router.post('/', validateTag, createTag)
router.get('/', validateTag, getAllTags)
router.patch('/:id', validateTag, updateTag)
router.delete('/:id', validateTag, deleteTag)

router.get('/:tagId/blogs', validateBlog, getBlogsByTag)

export default router
