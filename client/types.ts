// Типи даних для всіх сутностей

export interface Client {
    id?: number;
    name: string;
    phone: string;
    email?: string;
  }
  
  export interface Device {
    id?: number;
    brand: string;
    model: string;
    serialNumber?: string;
    clientId: number;
    client?: Client;
  }
  
  export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
  
  export interface Order {
    id?: number;
    deviceId: number;
    device?: Device;
    problem: string;
    status: OrderStatus;
    createdAt?: string;
    completedAt?: string;
    price?: number;
  }