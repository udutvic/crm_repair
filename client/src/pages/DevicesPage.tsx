import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton, Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DeviceForm from '../components/DeviceForm';
import { Device } from '../types';
import { getDevices, createDevice, updateDevice, deleteDevice } from '../index';

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(undefined);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      console.error('Помилка завантаження пристроїв:', error);
    }
  };

  const handleAddDevice = () => {
    setSelectedDevice(undefined);
    setOpenForm(true);
  };

  const handleEditDevice = (device: Device) => {
    setSelectedDevice(device);
    setOpenForm(true);
  };

  const handleDeleteDevice = async (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей пристрій?')) {
      try {
        await deleteDevice(id);
        loadDevices();
      } catch (error) {
        console.error('Помилка видалення пристрою:', error);
      }
    }
  };

  const handleSubmit = async (data: Device) => {
    try {
      if (selectedDevice) {
        await updateDevice(selectedDevice.id!, data);
      } else {
        await createDevice(data);
      }
      loadDevices();
    } catch (error) {
      console.error('Помилка збереження пристрою:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Typography variant="h4">Пристрої</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddDevice}
        >
          Додати пристрій
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Бренд</TableCell>
              <TableCell>Модель</TableCell>
              <TableCell>Серійний номер</TableCell>
              <TableCell>Клієнт</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.brand}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell>{device.serialNumber || '-'}</TableCell>
                <TableCell>
                  {device.client ? (
                    <Chip label={device.client.name} size="small" />
                  ) : (
                    <Chip label="Немає власника" size="small" color="default" variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditDevice(device)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDevice(device.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeviceForm 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        onSubmit={handleSubmit}
        initialData={selectedDevice}
      />
    </Container>
  );
};

export default DevicesPage;