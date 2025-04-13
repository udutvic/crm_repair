import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, 
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import OrderForm from '../components/OrderForm';
import { Order, OrderStatus } from '../types';
import { getOrders, createOrder, updateOrder, updateOrderStatus, deleteOrder } from '../index';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openForm, setOpenForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [orders, statusFilter]);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Помилка завантаження замовлень:', error);
    }
  };

  const handleAddOrder = () => {
    setSelectedOrder(undefined);
    setOpenForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenForm(true);
  };

  const handleDeleteOrder = async (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити це замовлення?')) {
      try {
        await deleteOrder(id);
        loadOrders();
      } catch (error) {
        console.error('Помилка видалення замовлення:', error);
      }
    }
  };

  const handleChangeStatus = async (id: number, status: OrderStatus) => {
    try {
      console.log(`Змінюю статус замовлення ${id} на ${status}`);
      await updateOrderStatus(id, status);
      console.log('Статус успішно змінено');
      loadOrders();
    } catch (error) {
      console.error('Помилка зміни статусу:', error);
    }
  };

  const handleSubmit = async (data: Order) => {
    try {
      if (selectedOrder) {
        console.log('Оновлюю замовлення:', selectedOrder.id, data);
        await updateOrder(selectedOrder.id!, data);
      } else {
        console.log('Створюю нове замовлення:', data);
        await createOrder(data);
      }
      setOpenForm(false); // Закриваємо форму після успішного збереження
      loadOrders(); // Оновлюємо список замовлень
    } catch (error) {
      console.error('Помилка збереження замовлення:', error);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const getStatusChip = (status: OrderStatus) => {
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Typography variant="h4">Замовлення</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddOrder}
        >
          Створити замовлення
        </Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Фільтр за статусом</InputLabel>
          <Select
            value={statusFilter}
            label="Фільтр за статусом"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">Всі</MenuItem>
            <MenuItem value="pending">Очікують</MenuItem>
            <MenuItem value="in_progress">В процесі</MenuItem>
            <MenuItem value="completed">Завершені</MenuItem>
            <MenuItem value="cancelled">Скасовані</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Пристрій</TableCell>
              <TableCell>Проблема</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Ціна</TableCell>
              <TableCell>Дата створення</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {order.device ? `${order.device.brand} ${order.device.model}` : '-'}
                </TableCell>
                <TableCell>{order.problem}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={order.status === 'pending' ? 'warning' : 
                           order.status === 'in_progress' ? 'info' : 
                           order.status === 'completed' ? 'success' : 'error'}
                    size="small"
                    onClick={() => {
                      // Циклічна зміна статусу
                      const nextStatus: OrderStatus = 
                        order.status === 'pending' ? 'in_progress' : 
                        order.status === 'in_progress' ? 'completed' : 
                        order.status === 'completed' ? 'cancelled' : 'pending';
                      
                      handleChangeStatus(order.id!, nextStatus);
                    }}
                    sx={{ minWidth: 120 }}
                  >
                    {order.status === 'pending' ? 'Очікує' : 
                     order.status === 'in_progress' ? 'В процесі' : 
                     order.status === 'completed' ? 'Завершено' : 'Скасовано'}
                  </Button>
                </TableCell>
                <TableCell>{order.price || '-'} грн</TableCell>
                <TableCell>{new Date(order.createdAt || '').toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOrder(order)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOrder(order.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <OrderForm 
        open={openForm} 
        onClose={() => setOpenForm(false)} 
        onSubmit={handleSubmit}
        initialData={selectedOrder}
      />
    </Container>
  );
};

export default OrdersPage;