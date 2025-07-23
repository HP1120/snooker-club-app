import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Tables from './components/Tables';
import PS5Booking from './components/PS5Booking';
import Members from './components/Members';
import Billing from './components/Billing';
import DrinksAndCigs from './components/DrinksAndCigs';
import HappyHours from './components/HappyHours';
import Staff from './components/Staff';
import Credits from './components/Credits';
import Inventory from './components/Inventory';
import Reports from './components/Reports';
import Expenses from './components/Expenses';
import Settings from './components/Settings';
import NotFound from './components/NotFound';

// Route protection wrapper
const ProtectedRoute = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<div>Login Page</div>} />
      
      {/* Protected routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Main */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tables"
        element={
          <ProtectedRoute>
            <Tables />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ps5-booking"
        element={
          <ProtectedRoute>
            <PS5Booking />
          </ProtectedRoute>
        }
      />

      {/* Management */}
      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members"
        element={
          <ProtectedRoute>
            <Members />
          </ProtectedRoute>
        }
      />
      <Route
        path="/drinks-cigarettes"
        element={
          <ProtectedRoute>
            <DrinksAndCigs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/happy-hours"
        element={
          <ProtectedRoute>
            <HappyHours />
          </ProtectedRoute>
        }
      />

      {/* Reports & Settings */}
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Additional routes */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute>
            <Staff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/credits"
        element={
          <ProtectedRoute>
            <Credits />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 