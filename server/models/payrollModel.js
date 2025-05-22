import mongoose from 'mongoose';

const payrollSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    month: {
      type: Date,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: [{
      type: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
    deductions: [{
      type: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
    overtimeHours: {
      type: Number,
      default: 0,
    },
    overtimeRate: {
      type: Number,
      required: true,
    },
    overtimeAmount: {
      type: Number,
      default: 0,
    },
    grossSalary: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'paid'],
      default: 'processing',
    },
    paidAt: {
      type: Date,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payroll = mongoose.model('Payroll', payrollSchema);

export default Payroll;