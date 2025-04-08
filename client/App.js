"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var Header_1 = require("./src/components/Header");
var Sidebar_1 = require("./src/components/Sidebar");
var HomePage_1 = require("./src/pages/HomePage");
var ClientsPage_1 = require("./src/pages/ClientsPage");
var DevicesPage_1 = require("./src/pages/DevicesPage");
var OrdersPage_1 = require("./src/pages/OrdersPage");
var App = function () {
    return (<react_router_dom_1.BrowserRouter>
      <material_1.Box sx={{ display: 'flex' }}>
        <material_1.CssBaseline />
        <Header_1.default />
        <Sidebar_1.default />
        <material_1.Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: "calc(100% - 240px)" } }}>
          <material_1.Toolbar /> {/* Цей елемент потрібен для відступу від верхньої панелі */}
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<HomePage_1.default />}/>
            <react_router_dom_1.Route path="/clients" element={<ClientsPage_1.default />}/>
            <react_router_dom_1.Route path="/devices" element={<DevicesPage_1.default />}/>
            <react_router_dom_1.Route path="/orders" element={<OrdersPage_1.default />}/>
          </react_router_dom_1.Routes>
        </material_1.Box>
      </material_1.Box>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
