/**
 * Статуси замовлення на ремонт
 */
export enum OrderStatus {
  PENDING = 'pending',       // В очікуванні
  IN_PROGRESS = 'inProgress', // В процесі
  COMPLETED = 'completed',    // Завершено
  CANCELED = 'canceled'       // Скасовано
}

/**
 * Інтерфейс для клієнта
 */
export interface IClient {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Інтерфейс для пристрою
 */
export interface IDevice {
  id?: number;
  brand: string;
  model: string;
  serialNumber?: string;
  clientId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Інтерфейс для замовлення на ремонт
 */
export interface IOrder {
  id?: number;
  deviceId: number;
  description: string;
  status: OrderStatus;
  price?: number;
  startDate: Date;
  estimatedEndDate?: Date;
  endDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
