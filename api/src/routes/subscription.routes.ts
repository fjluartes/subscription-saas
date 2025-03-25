import { Router } from 'express'
import {
  getSubscriptions,
  getAllSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscription.controller'

const router = Router()

router.get('/:userId', getSubscriptions)
router.get('/', getAllSubscriptions)
router.post('/', createSubscription)
router.put('/:id', updateSubscription)
router.delete('/:id', deleteSubscription)

export default router