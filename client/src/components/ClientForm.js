"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var react_hook_form_1 = require("react-hook-form");
var ClientForm = function (_a) {
    var open = _a.open, onClose = _a.onClose, onSubmit = _a.onSubmit, initialData = _a.initialData;
    var _b = (0, react_hook_form_1.useForm)({
        defaultValues: initialData || {
            name: '',
            phone: '',
            email: '',
        }
    }), control = _b.control, handleSubmit = _b.handleSubmit, reset = _b.reset;
    // Оновлюємо значення форми при зміні initialData
    (0, react_1.useEffect)(function () {
        if (initialData) {
            console.log('Оновлюю форму клієнта з даними:', initialData);
            reset(initialData);
        }
    }, [initialData, reset]);
    var submitHandler = function (data) {
        onSubmit(data);
    };
    return (<material_1.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <material_1.DialogTitle>{initialData ? 'Редагувати клієнта' : 'Додати нового клієнта'}</material_1.DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <material_1.DialogContent>
          <material_1.Grid container spacing={2}>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="name" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<material_1.TextField {...field} label="Ім'я" fullWidth/>);
        }}/>
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="phone" control={control} render={function (_a) {
            var field = _a.field, fieldState = _a.fieldState;
            return (<material_1.TextField {...field} label="Телефон" fullWidth/>);
        }}/>
            </material_1.Grid>
            <material_1.Grid item xs={12}>
              <react_hook_form_1.Controller name="email" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.TextField {...field} label="Email" fullWidth/>);
        }}/>
            </material_1.Grid>
          </material_1.Grid>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={onClose}>Скасувати</material_1.Button>
          <material_1.Button type="submit" variant="contained" color="primary">
            Зберегти
          </material_1.Button>
        </material_1.DialogActions>
      </form>
    </material_1.Dialog>);
};
exports.default = ClientForm;
