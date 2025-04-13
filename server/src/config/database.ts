import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL!, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Render вимагає
        },
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD!,
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: console.log,
      }
    );

export default sequelize;


