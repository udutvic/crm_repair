import React, { useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Client } from '../types';

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Client) => void;
  initialData?: Client;
}

const ClientForm: React.FC<ClientFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const { control, handleSubmit, reset } = useForm<Client>({
    defaultValues: initialData || {
      name: '',
      phone: '',
      email: '',
    }
  });
  
  // Оновлюємо значення форми при зміні initialData
  useEffect(() => {
    if (initialData) {
      console.log('Оновлюю форму клієнта з даними:', initialData);
      reset(initialData);
    }
  }, [initialData, reset]);

  const submitHandler = (data: Client) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Редагувати клієнта' : 'Додати нового клієнта'}</DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}

                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Ім'я"
                    fullWidth

                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="phone"
                control={control}

                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Телефон"
                    fullWidth

                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Скасувати</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
          >
            Зберегти
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientForm;