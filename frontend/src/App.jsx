import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import SuccessPage from './pages/SuccessPage';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import TableManagement from './pages/TableManagement';
import CustomerReviews from './pages/CustomerReviews';
import CafeProfile from './pages/CafeProfile';
import Settings from './pages/Settings';
import SecurityPassword from './pages/SecurityPassword';
import AppShell from './components/AppShell';
import MenuManagement from './pages/MenuManagement';
import Earnings from './pages/Earnings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes inside AppShell */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/tables" element={<TableManagement />} />
          <Route path="/reviews" element={<CustomerReviews />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/profile" element={<CafeProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/security" element={<SecurityPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
