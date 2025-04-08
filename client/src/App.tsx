import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import DevicesPage from './pages/DevicesPage';
import OrdersPage from './pages/OrdersPage';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
