import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import response1Data from '../response1.json';
import response2Data from '../response2.json';

const ProductCatalogue = ({ isAuthenticated, onLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState('IND'); // Default to IND (response1.json)

  // Load data based on selected dataset
  const responseData = useMemo(() => {
    return selectedDataset === 'IMF' ? response2Data : response1Data;
  }, [selectedDataset]);

  const categories = responseData.categories || {};
  const frequentData = responseData.frequent || [];

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleDatasetChange = (dataset) => {
    setSelectedDataset(dataset);
    // Reset selected category when dataset changes
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout}
        selectedDataset={selectedDataset}
        onDatasetChange={handleDatasetChange}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          selectedCategoryType={selectedDataset}
          onCategoryTypeChange={handleDatasetChange}
        />
        
        {/* Main Content */}
        <DataTable data={frequentData} />
      </div>
    </div>
  );
};

export default ProductCatalogue;
