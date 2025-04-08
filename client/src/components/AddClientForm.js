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
exports.AddClientForm = void 0;
var react_1 = require("react");
var api_1 = require("../api");
var useApiRequest_1 = require("../hooks/useApiRequest");
var ErrorMessage_1 = require("./ErrorMessage");
/**
 * Компонент форми для додавання нового клієнта
 * @param onClientAdded - Функція, яка викликається після успішного додавання клієнта
 */
var AddClientForm = function (_a) {
    var onClientAdded = _a.onClientAdded;
    var _b = (0, react_1.useState)(''), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(''), phone = _c[0], setPhone = _c[1];
    var _d = (0, react_1.useState)(''), email = _d[0], setEmail = _d[1];
    var _e = (0, useApiRequest_1.useApiRequest)(), loading = _e.loading, error = _e.error, executeRequest = _e.executeRequest, clearError = _e.clearError;
    var _f = (0, react_1.useState)(false), success = _f[0], setSuccess = _f[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var newClient, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    // Валідація форми
                    if (!name.trim()) {
                        return [2 /*return*/];
                    }
                    if (!phone.trim()) {
                        return [2 /*return*/];
                    }
                    newClient = {
                        name: name.trim(),
                        phone: phone.trim(),
                        email: email.trim() || undefined
                    };
                    return [4 /*yield*/, executeRequest(function () { return (0, api_1.createClient)(newClient); })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        // Очищення форми після успішного додавання
                        setName('');
                        setPhone('');
                        setEmail('');
                        setSuccess(true);
                        // Сховати повідомлення про успіх через 3 секунди
                        setTimeout(function () {
                            setSuccess(false);
                        }, 3000);
                        // Викликати функцію зворотного виклику, якщо вона передана
                        if (onClientAdded) {
                            onClientAdded(result);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Додати нового клієнта</h2>
      
      {error && <ErrorMessage_1.default message={error} onClose={clearError}/>}
      
      {success && (<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Клієнта успішно додано!</span>
        </div>)}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ім'я *
          </label>
          <input type="text" id="name" value={name} onChange={function (e) { return setName(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input type="tel" id="phone" value={phone} onChange={function (e) { return setPhone(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input type="email" id="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className={"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ".concat(loading ? 'opacity-50 cursor-not-allowed' : '')}>
            {loading ? 'Додавання...' : 'Додати клієнта'}
          </button>
        </div>
      </form>
    </div>);
};
exports.AddClientForm = AddClientForm;
exports.default = exports.AddClientForm;
