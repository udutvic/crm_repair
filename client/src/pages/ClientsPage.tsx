import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ClientForm from '../components/ClientForm';
import { Client } from '../types';
import { getClients, createClient, updateClient, deleteClient } from '../index';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error('Помилка завантаження клієнтів:', error);
    }
  };

  const handleAddClient = () => {
    setSelectedClient(undefined);
    setOpenForm(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setOpenForm(true);
  };

  const handleDeleteClient = async (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього клієнта?')) {
      try {
        await deleteClient(id);
        loadClients();
      } catch (error) {
        console.error('Помилка видалення клієнта:', error);
      }
    }
  };

  const handleSubmit = async (data: Client) => {
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id!, data);
      } else {
        await createClient(data);
      }
      loadClients();
      setOpenForm(false);
    } catch (error) {
      console.error('Помилка збереження клієнта:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Typography variant="h4">Клієнти</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddClient}
        >
          Додати клієнта
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ім'я</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Клієнтів не знайдено</TableCell>
              </TableRow>
            ) : clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClient(client)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClient(client.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ClientForm 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        onSubmit={handleSubmit}
        initialData={selectedClient}
      />
    </Container>
  );
};

export default ClientsPage;