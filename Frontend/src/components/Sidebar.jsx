import React, { useState } from 'react';

const Sidebar = ({ categories, selectedCategory, onCategorySelect, selectedCategoryType, onCategoryTypeChange }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const renderCategory = (categoryName, subCategories, level = 0, parentKey = '') => {
    const hasSubCategories = Object.keys(subCategories).length > 0;
    const uniqueKey = parentKey ? `${parentKey}-${categoryName}` : categoryName;
    const isExpanded = expandedCategories[uniqueKey];

    return (
      <div key={uniqueKey} className="mb-1">
        <div
          className={`flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 cursor-pointer ${
            selectedCategory === uniqueKey ? 'bg-gray-100' : ''
          }`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => {
            if (hasSubCategories) {
              toggleCategory(uniqueKey);
            } else {
              onCategorySelect(uniqueKey);
            }
          }}
        >
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-sm text-gray-700">{categoryName}</span>
            {hasSubCategories && level === 0 && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            )}
          </div>
          {hasSubCategories && (
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isExpanded ? 'transform rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
        {hasSubCategories && isExpanded && (
          <div>
            {Object.entries(subCategories).map(([subName, subSubCategories]) =>
              renderCategory(subName, subSubCategories, level + 1, uniqueKey)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <button className="text-gray-600 hover:text-gray-800">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Economic Monitor</h2>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category:
          </label>
          <select 
            value={selectedCategoryType || 'IND'}
            onChange={(e) => onCategoryTypeChange && onCategoryTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#404271]"
          >
            <option value="IND">India & States</option>
            <option value="IMF">IMF</option>
          </select>
        </div>
      </div>
      <div className="p-2">
        {Object.entries(categories).map(([categoryName, subCategories]) =>
          renderCategory(categoryName, subCategories, 0, '')
        )}
      </div>
    </div>
  );
};

export default Sidebar;

