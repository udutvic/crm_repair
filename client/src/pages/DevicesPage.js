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
var DeviceForm_1 = require("../components/DeviceForm");
var api_1 = require("../api");
var DevicesPage = function () {
    var _a = (0, react_1.useState)([]), devices = _a[0], setDevices = _a[1];
    var _b = (0, react_1.useState)(false), openForm = _b[0], setOpenForm = _b[1];
    var _c = (0, react_1.useState)(undefined), selectedDevice = _c[0], setSelectedDevice = _c[1];
    (0, react_1.useEffect)(function () {
        loadDevices();
    }, []);
    var loadDevices = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, api_1.getDevices)()];
                case 1:
                    data = _a.sent();
                    setDevices(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Помилка завантаження пристроїв:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAddDevice = function () {
        setSelectedDevice(undefined);
        setOpenForm(true);
    };
    var handleEditDevice = function (device) {
        setSelectedDevice(device);
        setOpenForm(true);
    };
    var handleDeleteDevice = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Ви впевнені, що хочете видалити цей пристрій?')) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, api_1.deleteDevice)(id)];
                case 2:
                    _a.sent();
                    loadDevices();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Помилка видалення пристрою:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!selectedDevice) return [3 /*break*/, 2];
                    console.log('Оновлюю пристрій:', selectedDevice.id, data);
                    return [4 /*yield*/, (0, api_1.updateDevice)(selectedDevice.id, data)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    console.log('Створюю новий пристрій:', data);
                    return [4 /*yield*/, (0, api_1.createDevice)(data)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setOpenForm(false); // Закриваємо форму після успішного збереження
                    loadDevices(); // Оновлюємо список пристроїв
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error('Помилка збереження пристрою:', error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<material_1.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <material_1.Typography variant="h4">Пристрої</material_1.Typography>
        <material_1.Button variant="contained" color="primary" startIcon={<icons_material_1.Add />} onClick={handleAddDevice}>
          Додати пристрій
        </material_1.Button>
      </div>

      <material_1.TableContainer component={material_1.Paper}>
        <material_1.Table>
          <material_1.TableHead>
            <material_1.TableRow>
              <material_1.TableCell>Бренд</material_1.TableCell>
              <material_1.TableCell>Модель</material_1.TableCell>
              <material_1.TableCell>Серійний номер</material_1.TableCell>
              <material_1.TableCell>Клієнт</material_1.TableCell>
              <material_1.TableCell>Дії</material_1.TableCell>
            </material_1.TableRow>
          </material_1.TableHead>
          <material_1.TableBody>
            {devices.map(function (device) { return (<material_1.TableRow key={device.id}>
                <material_1.TableCell>{device.brand}</material_1.TableCell>
                <material_1.TableCell>{device.model}</material_1.TableCell>
                <material_1.TableCell>{device.serialNumber || '-'}</material_1.TableCell>
                <material_1.TableCell>
                  {device.client ? (<material_1.Chip label={device.client.name} size="small"/>) : '-'}
                </material_1.TableCell>
                <material_1.TableCell>
                  <material_1.IconButton onClick={function () { return handleEditDevice(device); }}>
                    <icons_material_1.Edit />
                  </material_1.IconButton>
                  <material_1.IconButton onClick={function () { return handleDeleteDevice(device.id); }}>
                    <icons_material_1.Delete />
                  </material_1.IconButton>
                </material_1.TableCell>
              </material_1.TableRow>); })}
          </material_1.TableBody>
        </material_1.Table>
      </material_1.TableContainer>

      <DeviceForm_1.default open={openForm} onClose={function () { return setOpenForm(false); }} onSubmit={handleSubmit} initialData={selectedDevice}/>
    </material_1.Container>);
};
exports.default = DevicesPage;
