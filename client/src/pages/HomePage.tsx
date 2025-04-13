import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Grid, Paper, Box, 
  Card, CardContent, CardHeader, List, ListItem, 
  ListItemText, Chip, Divider 
} from '@mui/material';
import { 
  PeopleOutline as PeopleIcon, 
  PhoneAndroid as DeviceIcon, 
  Assignment as OrderIcon, 
  AttachMoney as MoneyIcon 
} from '@mui/icons-material';
import { getClients, getDevices, getOrders } from '../index';
import { Client, Device, Order } from '../types';

const HomePage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getClients();
        const devicesData = await getDevices();
        const ordersData = await getOrders();
        
        setClients(clientsData);
        setDevices(devicesData);
        setOrders(ordersData);
        
        // Отримати 5 останніх замовлень
        const sorted = [...ordersData].sort((a, b) => 
          new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        );
        setRecentOrders(sorted.slice(0, 5));
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    };
    
    fetchData();
  }, []);

  const getStatusChip = (status: string) => {
    let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
    let label = '';

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

    return <Chip label={label} color={color} size="small" />;
  };

  const calculateTotalIncome = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + (order.price || 0), 0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Дашборд
      </Typography>
      
      <Grid container spacing={3}>
        {/* Статистичні картки */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon fontSize="large" color="primary" />
                <Box ml={2}>
                  <Typography color="textSecondary" variant="subtitle1">
                    Клієнти
                  </Typography>
                  <Typography variant="h4">
                    {clients.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <DeviceIcon fontSize="large" color="secondary" />
                <Box ml={2}>
                  <Typography color="textSecondary" variant="subtitle1">
                    Пристрої
                  </Typography>
                  <Typography variant="h4">
                    {devices.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <OrderIcon fontSize="large" color="info" />
                <Box ml={2}>
                  <Typography color="textSecondary" variant="subtitle1">
                    Замовлення
                  </Typography>
                  <Typography variant="h4">
                    {orders.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <MoneyIcon fontSize="large" color="success" />
                <Box ml={2}>
                  <Typography color="textSecondary" variant="subtitle1">
                    Дохід
                  </Typography>
                  <Typography variant="h4">
                    {calculateTotalIncome()} грн
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Останні замовлення */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Останні замовлення
            </Typography>
            <List>
              {recentOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography>
                            {order.device?.brand} {order.device?.model}
                          </Typography>
                          {getStatusChip(order.status)}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            Проблема: {order.problem}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Ціна: {order.price || '-'} грн
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Дата: {new Date(order.createdAt || '').toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {recentOrders.length === 0 && (
                <ListItem>
                  <ListItemText primary="Немає замовлень" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;