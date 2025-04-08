import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import sequelize from './config/database';
// Імпортуємо моделі для ініціалізації асоціацій
import './models';
import seedDatabase from './seedData';

// Завантаження змінних середовища
dotenv.config();

// Ініціалізація Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Дозволяємо запити з будь-якого домену
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Мінімальне логування
app.use((req: Request, _res: Response, next: NextFunction) => {
  next();
});

// Маршрути API
app.use('/api', routes);

// Базовий маршрут
app.get('/', (_req: Request, res: Response) => {
  res.send('CRM Repair API працює!');
});

// Мінімальна обробка помилок
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).send('OK');
});

// Спрощений запуск сервера
const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Успішне підключення до бази даних');
    
    // Використовуємо force: true тільки для розробки, щоб виправити проблему з базою даних
    try {
      await sequelize.sync({ force: true });
      console.log('Базу даних успішно створено');
      
      // Заповнюємо базу даних тестовими даними
      await seedDatabase();
    } catch (error) {
      console.error('Помилка при синхронізації бази даних:', error);
    }
    console.log('Моделі бази даних синхронізовано');
    
    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Помилка при запуску сервера:', error);
  }
};

startServer();
