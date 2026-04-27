import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CrimeManagementPage from './pages/CrimeManagementPage';
import MapViewPage from './pages/MapViewPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 bg-gray-100 min-h-screen">
                    <DashboardPage />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/crimes"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 bg-gray-100 min-h-screen">
                    <CrimeManagementPage />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/map"
            element={
              <PrivateRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 bg-gray-100 min-h-screen">
                    <MapViewPage />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
