"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientRoutes_1 = __importDefault(require("./clientRoutes"));
const deviceRoutes_1 = __importDefault(require("./deviceRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const router = (0, express_1.Router)();
router.use('/clients', clientRoutes_1.default);
router.use('/devices', deviceRoutes_1.default);
router.use('/orders', orderRoutes_1.default);
exports.default = router;
