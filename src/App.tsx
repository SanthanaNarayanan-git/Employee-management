import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AttendancePage from './pages/AttendancePage';
import LeavePage from './pages/LeavePage';
import PayslipPage from './pages/PayslipPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="min-height-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <PrivateRoute>
                <AttendancePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/leaves" 
            element={
              <PrivateRoute>
                <LeavePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/payslips" 
            element={
              <PrivateRoute>
                <PayslipPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <PrivateRoute>
                <ReportsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/employees" 
            element={
              <AdminRoute>
                <EmployeeManagementPage />
              </AdminRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
}

export default App;