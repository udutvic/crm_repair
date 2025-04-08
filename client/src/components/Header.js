"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var Header = function () {
    return (<material_1.AppBar position="fixed" sx={{ zIndex: function (theme) { return theme.zIndex.drawer + 1; } }}>
      <material_1.Toolbar>
        <material_1.Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Ремонт CRM
        </material_1.Typography>
      </material_1.Toolbar>
    </material_1.AppBar>);
};
exports.default = Header;
