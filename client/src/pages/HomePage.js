"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var api_1 = require("../api");
var HomePage = function () {
    var _a = (0, react_1.useState)([]), clients = _a[0], setClients = _a[1];
    var _b = (0, react_1.useState)([]), devices = _b[0], setDevices = _b[1];
    var _c = (0, react_1.useState)([]), orders = _c[0], setOrders = _c[1];
    var _d = (0, react_1.useState)([]), recentOrders = _d[0], setRecentOrders = _d[1];
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var clientsData, devicesData, ordersData, sorted, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, (0, api_1.getClients)()];
                    case 1:
                        clientsData = _a.sent();
                        return [4 /*yield*/, (0, api_1.getDevices)()];
                    case 2:
                        devicesData = _a.sent();
                        return [4 /*yield*/, (0, api_1.getOrders)()];
                    case 3:
                        ordersData = _a.sent();
                        setClients(clientsData);
                        setDevices(devicesData);
                        setOrders(ordersData);
                        sorted = __spreadArray([], ordersData, true).sort(function (a, b) {
                            return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
                        });
                        setRecentOrders(sorted.slice(0, 5));
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Помилка завантаження даних:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    var getStatusChip = function (status) {
        var color = 'default';
        var label = '';
        switch (status) {
            case 'pending':
                color = 'warning';
                label = 'Очікує';
                break;
            case 'in_progress':
                color = 'info';
                label = 'В процесі';
                break;
            case 'completed':
                color = 'success';
                label = 'Завершено';
                break;
            case 'cancelled':
                color = 'error';
                label = 'Скасовано';
                break;
        }
        return <material_1.Chip label={label} color={color} size="small"/>;
    };
    var calculateTotalIncome = function () {
        return orders
            .filter(function (order) { return order.status === 'completed'; })
            .reduce(function (sum, order) { return sum + (order.price || 0); }, 0);
    };
    return (<material_1.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <material_1.Typography variant="h4" gutterBottom>
        Дашборд
      </material_1.Typography>
      
      <material_1.Grid container spacing={3}>
        {/* Статистичні картки */}
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Box display="flex" alignItems="center">
                <icons_material_1.PeopleOutline fontSize="large" color="primary"/>
                <material_1.Box ml={2}>
                  <material_1.Typography color="textSecondary" variant="subtitle1">
                    Клієнти
                  </material_1.Typography>
                  <material_1.Typography variant="h4">
                    {clients.length}
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
        
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Box display="flex" alignItems="center">
                <icons_material_1.PhoneAndroid fontSize="large" color="secondary"/>
                <material_1.Box ml={2}>
                  <material_1.Typography color="textSecondary" variant="subtitle1">
                    Пристрої
                  </material_1.Typography>
                  <material_1.Typography variant="h4">
                    {devices.length}
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
        
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Box display="flex" alignItems="center">
                <icons_material_1.Assignment fontSize="large" color="info"/>
                <material_1.Box ml={2}>
                  <material_1.Typography color="textSecondary" variant="subtitle1">
                    Замовлення
                  </material_1.Typography>
                  <material_1.Typography variant="h4">
                    {orders.length}
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
        
        <material_1.Grid item xs={12} sm={6} md={3}>
          <material_1.Card>
            <material_1.CardContent>
              <material_1.Box display="flex" alignItems="center">
                <icons_material_1.AttachMoney fontSize="large" color="success"/>
                <material_1.Box ml={2}>
                  <material_1.Typography color="textSecondary" variant="subtitle1">
                    Дохід
                  </material_1.Typography>
                  <material_1.Typography variant="h4">
                    {calculateTotalIncome()} грн
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.CardContent>
          </material_1.Card>
        </material_1.Grid>
        
        {/* Останні замовлення */}
        <material_1.Grid item xs={12}>
          <material_1.Paper sx={{ p: 2 }}>
            <material_1.Typography variant="h6" gutterBottom>
              Останні замовлення
            </material_1.Typography>
            <material_1.List>
              {recentOrders.map(function (order, index) {
            var _a, _b;
            return (<react_1.default.Fragment key={order.id}>
                  <material_1.ListItem>
                    <material_1.ListItemText primary={<material_1.Box display="flex" justifyContent="space-between">
                          <material_1.Typography>
                            {(_a = order.device) === null || _a === void 0 ? void 0 : _a.brand} {(_b = order.device) === null || _b === void 0 ? void 0 : _b.model}
                          </material_1.Typography>
                          {getStatusChip(order.status)}
                        </material_1.Box>} secondary={<>
                          <material_1.Typography variant="body2" color="textSecondary">
                            Проблема: {order.problem}
                          </material_1.Typography>
                          <material_1.Typography variant="body2" color="textSecondary">
                            Ціна: {order.price || '-'} грн
                          </material_1.Typography>
                          <material_1.Typography variant="body2" color="textSecondary">
                            Дата: {new Date(order.createdAt || '').toLocaleDateString()}
                          </material_1.Typography>
                        </>}/>
                  </material_1.ListItem>
                  {index < recentOrders.length - 1 && <material_1.Divider />}
                </react_1.default.Fragment>);
        })}
              {recentOrders.length === 0 && (<material_1.ListItem>
                  <material_1.ListItemText primary="Немає замовлень"/>
                </material_1.ListItem>)}
            </material_1.List>
          </material_1.Paper>
        </material_1.Grid>
      </material_1.Grid>
    </material_1.Container>);
};
exports.default = HomePage;
