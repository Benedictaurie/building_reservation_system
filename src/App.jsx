import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontendLayout from './layouts/FrontendLayout';
import HomePage from './pages/frontend/HomePage';
import BuildingDetailPage from './pages/frontend/BuildingDetailPage';
import ReservationPage from './pages/frontend/ReservationPage';
import ReservationSuccessPage from './pages/frontend/ReservationSuccessPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/backend/AdminDashboard';
import AdminBuildings from './pages/backend/AdminBuildings';
import AdminReservations from './pages/backend/AdminReservations';
import AdminCustomers from './pages/backend/AdminCustomers';

function App() {
  return (
    // <Router>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<FrontendLayout />}>
          <Route index element={<HomePage />} />
          <Route path="gedung/:id" element={<BuildingDetailPage />} />
          <Route path="reservasi/:id" element={<ReservationPage />} />
          <Route path="reservasi-sukses" element={<ReservationSuccessPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="gedung" element={<AdminBuildings />} />
          <Route path="reservasi" element={<AdminReservations />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
      </Routes>
    // </Router>
  );
}

export default App;