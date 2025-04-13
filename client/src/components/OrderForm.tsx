import React, { useEffect, useState } from 'react';
import { 
  TextField, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, Grid, FormControl, InputLabel, Select, MenuItem, 
  SelectChangeEvent 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Order, Device, OrderStatus } from '../types';
import { getDevices } from '../index';

interface OrderFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Order) => void;
  initialData?: Order;
}

const OrderForm: React.FC<OrderFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  
  const { control, handleSubmit, reset } = useForm<Order>({
    defaultValues: initialData || {
      deviceId: -1, // Використовуємо -1 як маркер відсутнього значення
      problem: '',
      status: 'pending',
      price: 0
    }
  });
  
  // Оновлюємо значення форми при зміні initialData
  useEffect(() => {
    if (initialData) {
      console.log('Оновлюю форму з даними:', initialData);
      reset(initialData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (error) {
        console.error('Помилка завантаження пристроїв:', error);
      }
    };

    if (open) {
      fetchDevices();
    }
  }, [open]);

  const submitHandler = (data: Order) => {
    console.log('Форма відправляє дані:', data);
    // Перевіряємо, що всі обов'язкові поля заповнені
    if (!data.deviceId || data.deviceId <= 0) {
      console.error('Помилка: не вказано пристрій');
      return;
    }
    if (!data.problem) {
      console.error('Помилка: не вказано проблему');
      return;
    }
    
    onSubmit(data);
    reset();
    onClose();
  };

  const statusOptions: { value: OrderStatus; label: string }[] = [
    { value: 'pending', label: 'Очікує' },
    { value: 'in_progress', label: 'В процесі' },
    { value: 'completed', label: 'Завершено' },
    { value: 'cancelled', label: 'Скасовано' }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Редагувати замовлення' : 'Створити нове замовлення'}</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="deviceId"
                control={control}
                rules={{ required: "Пристрій обов'язковий" }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel>Пристрій</InputLabel>
                    <Select
                      {...field}
                      value={field.value && field.value > 0 ? field.value.toString() : ''}
                      onChange={(e: SelectChangeEvent) => {
                        field.onChange(e.target.value ? Number(e.target.value) : -1);
                      }}
                    >
                      {devices.map((device) => (
                        <MenuItem key={device.id} value={device.id}>
                          {device.brand} {device.model} ({device.client?.name})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="problem"
                control={control}
                rules={{ required: "Опис проблеми обов'язковий" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Опис проблеми"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Статус</InputLabel>
                    <Select
                      {...field}
                      value={field.value || 'pending'}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ціна"
                    type="number"
                    fullWidth
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Скасувати</Button>
          <Button type="submit" variant="contained" color="primary">Зберегти</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OrderForm;