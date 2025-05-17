import express from 'express';
import asyncHandler from 'express-async-handler';
import Leave from '../models/leaveModel.js';
import { protect, manager } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create a leave request
// @route   POST /api/leaves
// @access  Private
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { type, startDate, endDate, days, reason } = req.body;

    const leave = await Leave.create({
      user: req.user._id,
      type,
      startDate,
      endDate,
      days,
      reason,
    });

    res.status(201).json(leave);
  })
);

// @desc    Get user's leave requests
// @route   GET /api/leaves
// @access  Private
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const leaves = await Leave.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(leaves);
  })
);

// @desc    Update leave request status
// @route   PUT /api/leaves/:id
// @access  Private/Manager
router.put(
  '/:id',
  protect,
  manager,
  asyncHandler(async (req, res) => {
    const leave = await Leave.findById(req.params.id);

    if (leave) {
      leave.status = req.body.status || leave.status;
      const updatedLeave = await leave.save();
      res.json(updatedLeave);
    } else {
      res.status(404);
      throw new Error('Leave request not found');
    }
  })
);

// @desc    Get all leave requests (for managers)
// @route   GET /api/leaves/all
// @access  Private/Manager
router.get(
  '/all',
  protect,
  manager,
  asyncHandler(async (req, res) => {
    const leaves = await Leave.find({})
      .populate('user', 'name email department')
      .sort({ createdAt: -1 });
    res.json(leaves);
  })
);

export default router;