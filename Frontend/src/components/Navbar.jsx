import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout, selectedDataset, onDatasetChange }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLoginClick = () => {
    navigate('/signin');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDatasetSelect = (dataset) => {
    onDatasetChange(dataset);
    setIsDropdownOpen(false);
  };

  const getDatasetLabel = (dataset) => {
    return dataset === 'IMF' ? 'IMF' : 'IND';
  };

  return (
    <nav className="bg-[#404271] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#404271] font-bold text-lg">d</span>
              </div>
            </div>
            <Link to="/" className="flex flex-col">
              <span className="text-xl font-bold">IndiaDataHub</span>
              <span className="text-xs text-gray-300">Data | Analytics | Intelligence</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for data and analytics"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Database Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-[#505382] transition-colors"
              >
                <span>Database: {getDatasetLabel(selectedDataset)}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => handleDatasetSelect('IND')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedDataset === 'IND' ? 'bg-gray-100 text-[#404271] font-medium' : 'text-gray-700'
                      }`}
                    >
                      IND
                    </button>
                    <button
                      onClick={() => handleDatasetSelect('IMF')}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedDataset === 'IMF' ? 'bg-gray-100 text-[#404271] font-medium' : 'text-gray-700'
                      }`}
                    >
                      IMF
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar */}
            <button className="px-3 py-2 rounded-lg hover:bg-[#505382] transition-colors">
              Calendar
            </button>

            {/* Help */}
            <button className="px-3 py-2 rounded-lg hover:bg-[#505382] transition-colors">
              Help
            </button>

            {/* Login Button or User Icon */}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-full bg-white text-[#404271] flex items-center justify-center font-semibold hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 bg-white text-[#404271] rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

