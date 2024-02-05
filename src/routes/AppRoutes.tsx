import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import CityPage from 'pages/CityPage';

const AppRoutes: React.FC = () => {
  // Some fancy routing going on!
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city" element={<CityPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
