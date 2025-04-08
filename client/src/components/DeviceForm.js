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
var react_hook_form_1 = require("react-hook-form");
var api_1 = require("../api");
var DeviceForm = function (_a) {
    var open = _a.open, onClose = _a.onClose, onSubmit = _a.onSubmit, initialData = _a.initialData;
    var _b = (0, react_1.useState)([]), clients = _b[0], setClients = _b[1];
    var _c = (0, react_hook_form_1.useForm)({
        defaultValues: initialData || {
            brand: '',
            model: '',
            serialNumber: '',
            clientId: -1 // Використовуємо -1 як маркер відсутнього значення
        }
    }), control = _c.control, handleSubmit = _c.handleSubmit, reset = _c.reset, setValue = _c.setValue;
    // Оновлюємо значення форми при зміні initialData
    (0, react_1.useEffect)(function () {
        if (initialData) {
            console.log('Оновлюю форму пристрою з даними:', initialData);
            reset(initialData);
        }
    }, [initialData, reset]);
    (0, react_1.useEffect)(function () {
        var fetchClients = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, api_1.getClients)()];
                    case 1:
                        data = _a.sent();
                        setClients(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Помилка завантаження клієнтів:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        if (open) {
            fetchClients();
        }
    }, [open]);
    var submitHandler = function (data) {
        onSubmit(data);
        reset();
        onClose();
    };
    return (<material_1.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <material_1.DialogTitle>{initialData ? 'Редагувати пристрій' : 'Додати новий пристрій'}</material_1.DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <material_1.DialogContent>
          <material_1.Grid container spacing={2}>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="brand" control={control} rules={{ required: "Бренд обов'язковий" }} render={function (_a) {
            var _b;
            var field = _a.field, fieldState = _a.fieldState;
            return (<material_1.TextField {...field} label="Бренд" fullWidth error={!!fieldState.error} helperText={(_b = fieldState.error) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="model" control={control} rules={{ required: "Модель обов'язкова" }} render={function (_a) {
            var _b;
            var field = _a.field, fieldState = _a.fieldState;
            return (<material_1.TextField {...field} label="Модель" fullWidth error={!!fieldState.error} helperText={(_b = fieldState.error) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="serialNumber" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.TextField {...field} label="Серійний номер" fullWidth/>);
        }}/>
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="clientId" control={control} rules={{ required: "Клієнт обов'язковий" }} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<material_1.FormControl fullWidth error={!!fieldState.error}>
                    <material_1.InputLabel>Клієнт</material_1.InputLabel>
                    <material_1.Select {...field} value={field.value && field.value > 0 ? field.value.toString() : ''} onChange={function (e) {
                    field.onChange(e.target.value ? Number(e.target.value) : -1);
                }}>
                      {clients.map(function (client) { return (<material_1.MenuItem key={client.id} value={client.id}>
                          {client.name} ({client.phone})
                        </material_1.MenuItem>); })}
                    </material_1.Select>
                  </material_1.FormControl>);
        }}/>
            </material_1.Grid>
          </material_1.Grid>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={onClose}>Скасувати</material_1.Button>
          <material_1.Button type="submit" variant="contained" color="primary">Зберегти</material_1.Button>
        </material_1.DialogActions>
      </form>
    </material_1.Dialog>);
};
exports.default = DeviceForm;
