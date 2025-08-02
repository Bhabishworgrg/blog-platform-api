import express from 'express'

import validateComment from '../middleware/validateComment.js'
import {
	updateComment,
	deleteComment
} from '../controllers/commentController.js'

const router = express.Router()

router.patch('/:id', validateComment, updateComment)
router.delete('/:id', validateComment, deleteComment)

export default router
