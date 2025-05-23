import axios from '../config/axios';

export const authAPI = {
  login: (email: string, password: string) => 
    axios.post('/users/login', { email, password }),
  
  getProfile: () => 
    axios.get('/users/profile'),
};

export const attendanceAPI = {
  markAttendance: (type: 'checkin' | 'checkout') => 
    axios.post('/attendance', { type }),
  
  getAttendance: (month?: number, year?: number) => 
    axios.get('/attendance', { params: { month, year } }),
};

export const leaveAPI = {
  createLeave: (data: any) => 
    axios.post('/leaves', data),
  
  getUserLeaves: () => 
    axios.get('/leaves'),
  
  getAllLeaves: (status?: string, startDate?: string, endDate?: string) => 
    axios.get('/leaves/all', { params: { status, startDate, endDate } }),
  
  updateLeaveStatus: (id: string, data: any) => 
    axios.put(`/leaves/${id}`, data),
  
  cancelLeave: (id: string) => 
    axios.delete(`/leaves/${id}`),
};

export const payrollAPI = {
  getPayslips: (month?: number, year?: number) => 
    axios.get('/payroll', { params: { month, year } }),
  
  getAllPayrolls: (month?: number, year?: number, department?: string) => 
    axios.get('/payroll/all', { params: { month, year, department } }),
  
  generatePayroll: (data: any) => 
    axios.post('/payroll', data),
  
  updatePayrollStatus: (id: string, data: any) => 
    axios.put(`/payroll/${id}`, data),
};