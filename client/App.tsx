import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import HomePage from './src/pages/HomePage';
import ClientsPage from './src/pages/ClientsPage';
import DevicesPage from './src/pages/DevicesPage';
import OrdersPage from './src/pages/OrdersPage';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          <Toolbar /> {/* Цей елемент потрібен для відступу від верхньої панелі */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;