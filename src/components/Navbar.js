import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaProjectDiagram, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">AgencyCRM</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1 ml-10">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200 flex items-center ${isActive('/')}`}
              >
                <FaHome className="mr-2" />
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200 flex items-center ${isActive('/projects')}`}
              >
                <FaProjectDiagram className="mr-2" />
                Projects
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-200" />
              <span className="text-sm">{currentUser?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-200 ${isActive('/')}`}
          >
            Dashboard
          </Link>
          <Link
            to="/projects"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-200 ${isActive('/projects')}`}
          >
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;