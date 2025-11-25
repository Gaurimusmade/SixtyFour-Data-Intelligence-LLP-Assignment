import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ProductCatalogue from './pages/ProductCatalogue';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/product-catalogue" replace />
            ) : (
              <SignIn onSignIn={handleSignIn} />
            )
          }
        />
        <Route
          path="/product-catalogue"
          element={
            isAuthenticated ? (
              <ProductCatalogue isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? '/product-catalogue' : '/signin'} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
