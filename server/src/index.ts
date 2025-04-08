import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import sequelize from './config/database';
import './models'; // ініціалізація моделей
// import seedDatabase from './seedData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';

// Middleware
app.use(cors({
  origin: ['https://crm-repair-web.onrender.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршрути API
// Видаляємо тестовий маршрут і додаємо маршрути без префіксу

// Додаємо маршрут для кореневого шляху, який повертає статус API
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'CRM Repair API працює!' });
});

// Додаємо маршрути API
app.use('/api', routes);
app.use('/', routes);

// Глобальний error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Серверна помилка:', err);
  res.status(500).send('Щось пішло не так');
});

// Старт сервера
const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Підключення до бази даних встановлено');

    await sequelize.sync({ force: isDev, alter: !isDev });
console.log('🗃 Схема бази даних синхронізована'); 

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Помилка запуску сервера:', error);
  }
};

startServer();

