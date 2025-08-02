import express from 'express'

import validateTag from '../middleware/validateTag.js'
import {
	createTag,
	getAllTags,
	updateTag,
	deleteTag
} from '../controllers/tagController.js'

import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.post('/', requireAuth, validateTag, createTag)
router.get('/', getAllTags)
router.patch('/:id', requireAuth, validateTag, updateTag)
router.delete('/:id', requireAuth, deleteTag)

export default router
