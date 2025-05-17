import express from 'express';
import asyncHandler from 'express-async-handler';
import Attendance from '../models/attendanceModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Mark attendance (check in/out)
// @route   POST /api/attendance
// @access  Private
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { type } = req.body; // type can be 'checkin' or 'checkout'
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (type === 'checkin') {
      // Check if already checked in today
      const existingAttendance = await Attendance.findOne({
        user: req.user._id,
        date: today,
      });

      if (existingAttendance) {
        res.status(400);
        throw new Error('Already checked in today');
      }

      // Determine if late (after 9 AM)
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0;

      const attendance = await Attendance.create({
        user: req.user._id,
        date: today,
        checkIn: now,
        status: isLate ? 'late' : 'present',
      });

      res.status(201).json(attendance);
    } else if (type === 'checkout') {
      const attendance = await Attendance.findOne({
        user: req.user._id,
        date: today,
      });

      if (!attendance) {
        res.status(400);
        throw new Error('No check-in found for today');
      }

      if (attendance.checkOut) {
        res.status(400);
        throw new Error('Already checked out today');
      }

      attendance.checkOut = now;
      
      // Calculate working hours
      const hours = (now - attendance.checkIn) / (1000 * 60 * 60);
      attendance.workingHours = parseFloat(hours.toFixed(2));

      // Calculate overtime (if worked more than 8 hours)
      if (hours > 8) {
        attendance.overtime = parseFloat((hours - 8).toFixed(2));
      }

      const updatedAttendance = await attendance.save();
      res.json(updatedAttendance);
    }
  })
);

// @desc    Get user's attendance history
// @route   GET /api/attendance
// @access  Private
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { month, year } = req.query;
    let dateFilter = {};

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      dateFilter = {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    }

    const attendance = await Attendance.find({
      user: req.user._id,
      ...dateFilter,
    }).sort({ date: -1 });

    res.json(attendance);
  })
);

export default router;