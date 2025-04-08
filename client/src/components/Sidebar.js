"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var react_router_dom_1 = require("react-router-dom");
var drawerWidth = 240;
var Sidebar = function () {
    var location = (0, react_router_dom_1.useLocation)();
    var menuItems = [
        { text: 'Дашборд', icon: <icons_material_1.Dashboard />, path: '/' },
        { text: 'Клієнти', icon: <icons_material_1.People />, path: '/clients' },
        { text: 'Пристрої', icon: <icons_material_1.Devices />, path: '/devices' },
        { text: 'Замовлення', icon: <icons_material_1.Assignment />, path: '/orders' }
    ];
    return (<material_1.Drawer variant="permanent" sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}>
      <material_1.Toolbar />
      <material_1.Divider />
      <material_1.List>
        {menuItems.map(function (item) { return (<material_1.ListItem button key={item.text} component={react_router_dom_1.Link} to={item.path} selected={location.pathname === item.path}>
            <material_1.ListItemIcon>{item.icon}</material_1.ListItemIcon>
            <material_1.ListItemText primary={item.text}/>
          </material_1.ListItem>); })}
      </material_1.List>
    </material_1.Drawer>);
};
exports.default = Sidebar;
