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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var OrderForm_1 = require("../components/OrderForm");
var api_1 = require("../api");
var OrdersPage = function () {
    var _a = (0, react_1.useState)([]), orders = _a[0], setOrders = _a[1];
    var _b = (0, react_1.useState)([]), filteredOrders = _b[0], setFilteredOrders = _b[1];
    var _c = (0, react_1.useState)('all'), statusFilter = _c[0], setStatusFilter = _c[1];
    var _d = (0, react_1.useState)(false), openForm = _d[0], setOpenForm = _d[1];
    var _e = (0, react_1.useState)(undefined), selectedOrder = _e[0], setSelectedOrder = _e[1];
    (0, react_1.useEffect)(function () {
        loadOrders();
    }, []);
    (0, react_1.useEffect)(function () {
        if (statusFilter === 'all') {
            setFilteredOrders(orders);
        }
        else {
            setFilteredOrders(orders.filter(function (order) { return order.status === statusFilter; }));
        }
    }, [orders, statusFilter]);
    var loadOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, api_1.getOrders)()];
                case 1:
                    data = _a.sent();
                    setOrders(data);
                    setFilteredOrders(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Помилка завантаження замовлень:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAddOrder = function () {
        setSelectedOrder(undefined);
        setOpenForm(true);
    };
    var handleEditOrder = function (order) {
        setSelectedOrder(order);
        setOpenForm(true);
    };
    var handleDeleteOrder = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Ви впевнені, що хочете видалити це замовлення?')) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.deleteOrder)(id)];
                case 2:
                    _a.sent();
                    loadOrders();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Помилка видалення замовлення:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleChangeStatus = function (id, status) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("\u0417\u043C\u0456\u043D\u044E\u044E \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F ".concat(id, " \u043D\u0430 ").concat(status));
                    return [4 /*yield*/, (0, api_1.updateOrderStatus)(id, status)];
                case 1:
                    _a.sent();
                    console.log('Статус успішно змінено');
                    loadOrders();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Помилка зміни статусу:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!selectedOrder) return [3 /*break*/, 2];
                    console.log('Оновлюю замовлення:', selectedOrder.id, data);
                    return [4 /*yield*/, (0, api_1.updateOrder)(selectedOrder.id, data)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    console.log('Створюю нове замовлення:', data);
                    return [4 /*yield*/, (0, api_1.createOrder)(data)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setOpenForm(false); // Закриваємо форму після успішного збереження
                    loadOrders(); // Оновлюємо список замовлень
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.error('Помилка збереження замовлення:', error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleFilterChange = function (event) {
        setStatusFilter(event.target.value);
    };
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
    return (<material_1.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <material_1.Typography variant="h4">Замовлення</material_1.Typography>
        <material_1.Button variant="contained" color="primary" startIcon={<icons_material_1.Add />} onClick={handleAddOrder}>
          Створити замовлення
        </material_1.Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <material_1.FormControl sx={{ minWidth: 200 }}>
          <material_1.InputLabel>Фільтр за статусом</material_1.InputLabel>
          <material_1.Select value={statusFilter} label="Фільтр за статусом" onChange={handleFilterChange}>
            <material_1.MenuItem value="all">Всі</material_1.MenuItem>
            <material_1.MenuItem value="pending">Очікують</material_1.MenuItem>
            <material_1.MenuItem value="in_progress">В процесі</material_1.MenuItem>
            <material_1.MenuItem value="completed">Завершені</material_1.MenuItem>
            <material_1.MenuItem value="cancelled">Скасовані</material_1.MenuItem>
          </material_1.Select>
        </material_1.FormControl>
      </div>

      <material_1.TableContainer component={material_1.Paper}>
        <material_1.Table>
          <material_1.TableHead>
            <material_1.TableRow>
              <material_1.TableCell>ID</material_1.TableCell>
              <material_1.TableCell>Пристрій</material_1.TableCell>
              <material_1.TableCell>Проблема</material_1.TableCell>
              <material_1.TableCell>Статус</material_1.TableCell>
              <material_1.TableCell>Ціна</material_1.TableCell>
              <material_1.TableCell>Дата створення</material_1.TableCell>
              <material_1.TableCell>Дії</material_1.TableCell>
            </material_1.TableRow>
          </material_1.TableHead>
          <material_1.TableBody>
            {filteredOrders.map(function (order) { return (<material_1.TableRow key={order.id}>
                <material_1.TableCell>{order.id}</material_1.TableCell>
                <material_1.TableCell>
                  {order.device ? "".concat(order.device.brand, " ").concat(order.device.model) : '-'}
                </material_1.TableCell>
                <material_1.TableCell>{order.problem}</material_1.TableCell>
                <material_1.TableCell>
                  <material_1.Button variant="contained" color={order.status === 'pending' ? 'warning' :
                order.status === 'in_progress' ? 'info' :
                    order.status === 'completed' ? 'success' : 'error'} size="small" onClick={function () {
                // Циклічна зміна статусу
                var nextStatus = order.status === 'pending' ? 'in_progress' :
                    order.status === 'in_progress' ? 'completed' :
                        order.status === 'completed' ? 'cancelled' : 'pending';
                handleChangeStatus(order.id, nextStatus);
            }} sx={{ minWidth: 120 }}>
                    {order.status === 'pending' ? 'Очікує' :
                order.status === 'in_progress' ? 'В процесі' :
                    order.status === 'completed' ? 'Завершено' : 'Скасовано'}
                  </material_1.Button>
                </material_1.TableCell>
                <material_1.TableCell>{order.price || '-'} грн</material_1.TableCell>
                <material_1.TableCell>{new Date(order.createdAt || '').toLocaleDateString()}</material_1.TableCell>
                <material_1.TableCell>
                  <material_1.IconButton onClick={function () { return handleEditOrder(order); }}>
                    <icons_material_1.Edit />
                  </material_1.IconButton>
                  <material_1.IconButton onClick={function () { return handleDeleteOrder(order.id); }}>
                    <icons_material_1.Delete />
                  </material_1.IconButton>
                </material_1.TableCell>
              </material_1.TableRow>); })}
          </material_1.TableBody>
        </material_1.Table>
      </material_1.TableContainer>

      <OrderForm_1.default open={openForm} onClose={function () { return setOpenForm(false); }} onSubmit={handleSubmit} initialData={selectedOrder}/>
    </material_1.Container>);
};
exports.default = OrdersPage;
