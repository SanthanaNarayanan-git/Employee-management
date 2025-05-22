import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['present', 'absent', 'late'],
      default: 'present',
    },
    workingHours: {
      type: Number,
      required: false,
    },
    overtime: {
      type: Number,
      required: false,
      default: 0,
    },
    regularized: {
      type: Boolean,
      default: false,
    },
    regularizationReason: {
      type: String,
    },
    regularizationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
    },
    regularizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;