import express from 'express';
import {
  createLeave,
  getUserLeaves,
  updateLeaveStatus,
  getAllLeaves,
  cancelLeave,
} from '../controllers/leaveController.js';
import { protect, manager } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createLeave)
  .get(protect, getUserLeaves);

router.get('/all', protect, manager, getAllLeaves);
router.route('/:id')
  .put(protect, manager, updateLeaveStatus)
  .delete(protect, cancelLeave);

export default router;