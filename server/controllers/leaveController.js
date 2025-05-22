import asyncHandler from 'express-async-handler';
import Leave from '../models/leaveModel.js';

// @desc    Create a leave request
// @route   POST /api/leaves
// @access  Private
const createLeave = asyncHandler(async (req, res) => {
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
});

// @desc    Get user's leave requests
// @route   GET /api/leaves
// @access  Private
const getUserLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({ user: req.user._id })
    .sort({ createdAt: -1 });
  res.json(leaves);
});

// @desc    Update leave request status
// @route   PUT /api/leaves/:id
// @access  Private/Manager
const updateLeaveStatus = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);

  if (!leave) {
    res.status(404);
    throw new Error('Leave request not found');
  }

  leave.status = req.body.status;
  leave.approvedBy = req.user._id;
  leave.approvedAt = Date.now();
  leave.comments = req.body.comments;

  const updatedLeave = await leave.save();
  res.json(updatedLeave);
});

// @desc    Get all leave requests (for managers)
// @route   GET /api/leaves/all
// @access  Private/Manager
const getAllLeaves = asyncHandler(async (req, res) => {
  const { status, startDate, endDate } = req.query;
  let filter = {};

  if (status) {
    filter.status = status;
  }

  if (startDate && endDate) {
    filter.startDate = { $gte: new Date(startDate) };
    filter.endDate = { $lte: new Date(endDate) };
  }

  const leaves = await Leave.find(filter)
    .populate('user', 'name email department')
    .populate('approvedBy', 'name')
    .sort({ createdAt: -1 });

  res.json(leaves);
});

// @desc    Cancel leave request
// @route   DELETE /api/leaves/:id
// @access  Private
const cancelLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);

  if (!leave) {
    res.status(404);
    throw new Error('Leave request not found');
  }

  if (leave.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  if (leave.status !== 'pending') {
    res.status(400);
    throw new Error('Can only cancel pending leave requests');
  }

  await leave.remove();
  res.json({ message: 'Leave request cancelled' });
});

export {
  createLeave,
  getUserLeaves,
  updateLeaveStatus,
  getAllLeaves,
  cancelLeave,
};