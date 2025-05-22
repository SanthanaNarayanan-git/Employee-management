import express from 'express';
import {
  generatePayroll,
  getPayslips,
  getAllPayrolls,
  updatePayrollStatus,
} from '../controllers/payrollController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, generatePayroll)
  .get(protect, getPayslips);

router.get('/all', protect, admin, getAllPayrolls);
router.put('/:id', protect, admin, updatePayrollStatus);

export default router;