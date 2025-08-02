import express from 'express'

import validateComment from '../middleware/validateComment.js'
import {
	updateComment,
	deleteComment
} from '../controllers/commentController.js'

import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.patch('/:id', requireAuth, validateComment, updateComment)
router.delete('/:id', requireAuth, deleteComment)

export default router
