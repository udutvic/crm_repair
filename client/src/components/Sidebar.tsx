import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, Toolbar, Divider, ListItemButton } from '@mui/material';
import { Dashboard, People, Devices, Assignment } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { text: 'Дашборд', icon: <Dashboard />, path: '/' },
    { text: 'Клієнти', icon: <People />, path: '/clients' },
    { text: 'Пристрої', icon: <Devices />, path: '/devices' },
    { text: 'Замовлення', icon: <Assignment />, path: '/orders' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton              
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;