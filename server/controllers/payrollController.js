import asyncHandler from 'express-async-handler';
import Payroll from '../models/payrollModel.js';
import Attendance from '../models/attendanceModel.js';

// @desc    Generate payroll for an employee
// @route   POST /api/payroll
// @access  Private/Admin
const generatePayroll = asyncHandler(async (req, res) => {
  const { userId, month, year } = req.body;

  // Calculate start and end dates for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // Get attendance records for the month
  const attendanceRecords = await Attendance.find({
    user: userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  // Calculate overtime hours
  const totalOvertimeHours = attendanceRecords.reduce(
    (total, record) => total + (record.overtime || 0),
    0
  );

  // Create payroll record
  const payroll = await Payroll.create({
    user: userId,
    month: startDate,
    basicSalary: req.body.basicSalary,
    allowances: req.body.allowances,
    deductions: req.body.deductions,
    overtimeHours: totalOvertimeHours,
    overtimeRate: req.body.overtimeRate,
    overtimeAmount: totalOvertimeHours * req.body.overtimeRate,
    grossSalary: req.body.basicSalary + 
      req.body.allowances.reduce((total, allowance) => total + allowance.amount, 0) +
      (totalOvertimeHours * req.body.overtimeRate),
    netSalary: req.body.basicSalary + 
      req.body.allowances.reduce((total, allowance) => total + allowance.amount, 0) +
      (totalOvertimeHours * req.body.overtimeRate) -
      req.body.deductions.reduce((total, deduction) => total + deduction.amount, 0),
  });

  res.status(201).json(payroll);
});

// @desc    Get employee payslips
// @route   GET /api/payroll
// @access  Private
const getPayslips = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  let dateFilter = {};

  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    dateFilter = {
      month: {
        $gte: startDate,
        $lte: endDate,
      },
    };
  }

  const payslips = await Payroll.find({
    user: req.user._id,
    ...dateFilter,
  }).sort({ month: -1 });

  res.json(payslips);
});

// @desc    Get all payrolls (for admin)
// @route   GET /api/payroll/all
// @access  Private/Admin
const getAllPayrolls = asyncHandler(async (req, res) => {
  const { month, year, department } = req.query;
  let filter = {};

  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    filter.month = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const payrolls = await Payroll.find(filter)
    .populate('user', 'name email department position')
    .sort({ month: -1 });

  res.json(payrolls);
});

// @desc    Update payroll status
// @route   PUT /api/payroll/:id
// @access  Private/Admin
const updatePayrollStatus = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  if (!payroll) {
    res.status(404);
    throw new Error('Payroll record not found');
  }

  payroll.status = req.body.status;
  if (req.body.status === 'paid') {
    payroll.paidAt = Date.now();
  }
  payroll.comments = req.body.comments;

  const updatedPayroll = await payroll.save();
  res.json(updatedPayroll);
});

export {
  generatePayroll,
  getPayslips,
  getAllPayrolls,
  updatePayrollStatus,
};