import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BarChart3, MapPin, Briefcase } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'bg-blue-700' : '';

  return (
    <div className="bg-blue-600 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-2xl font-bold">SAFEWALK Admin</h1>
        <p className="text-blue-200 text-sm">Crime Monitoring System</p>
      </div>

      <nav className="flex-1 p-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg hover:bg-blue-700 transition ${isActive('/dashboard')}`}
        >
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/crimes"
          className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg hover:bg-blue-700 transition ${isActive('/crimes')}`}
        >
          <Briefcase size={20} />
          <span>Crime Management</span>
        </Link>

        <Link
          to="/map"
          className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg hover:bg-blue-700 transition ${isActive('/map')}`}
        >
          <MapPin size={20} />
          <span>Map View</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
