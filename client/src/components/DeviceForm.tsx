import React, { useEffect, useState } from 'react';
import { 
  TextField, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, Grid, FormControl, InputLabel, Select, MenuItem, 
  SelectChangeEvent 
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Device, Client } from '../types';
import { getClients } from '../index';

interface DeviceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Device) => void;
  initialData?: Device;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [clients, setClients] = useState<Client[]>([]);
  
  const { control, handleSubmit, reset, setValue } = useForm<Device>({
    defaultValues: initialData || {
      brand: '',
      model: '',
      serialNumber: '',
      client: {}
    }
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Помилка завантаження клієнтів:', error);
      }
    };

    if (open) {
      fetchClients();
    }
  }, [open]);

  const submitHandler = (data: Device) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Редагувати пристрій' : 'Додати новий пристрій'}</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="brand"
                control={control}
                rules={{ required: "Бренд обов'язковий" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Бренд"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="model"
                control={control}
                rules={{ required: "Модель обов'язкова" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Модель"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="serialNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Серійний номер"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="clientId"
                control={control}
                rules={{ required: "Клієнт обов'язковий" }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel>Клієнт</InputLabel>
                    <Select
                      {...field}
                      value={field.value && field.value > 0 ? field.value.toString() : ''}
                      onChange={(e: SelectChangeEvent) => {
                        field.onChange(e.target.value ? Number(e.target.value) : -1);
                      }}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.name} ({client.phone})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

export default DeviceForm;