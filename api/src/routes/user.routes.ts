import { Router } from 'express'
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
} from '../controllers/user.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.post('/', registerUser)
router.post('/login', authUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser)

export default router