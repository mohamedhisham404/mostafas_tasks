import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import sequelize from "../config/database.js";
import BookRoutes from './routes/BookRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';

dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 3000;

async function testDatabaseConnection() {
  try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}

async function syncDatabase() {
  try {
      await sequelize.sync({ alter: true }); 
      console.log('Database synced successfully.');
  } catch (error) {
      console.error('Unable to sync database:', error);
  }
}

async function startApp() {
  await testDatabaseConnection();
  await syncDatabase(); 

  // Middlewares
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  // Routes
  app.use('/books', BookRoutes);
  app.use('/', AuthRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
}

startApp();