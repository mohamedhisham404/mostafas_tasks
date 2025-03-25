import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/AuthRoutes.js';
import CategoriesRoutes from './routes/CategoriesRoutes.js';
import ProductsRoutes from './routes/ProductsRoutes.js';
import OrdersRoutes from './routes/OrdersRoutes.js';
import { testDatabaseConnection, syncDatabase } from '../config/connectDB.js';

dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 3000;

async function startApp() {
  await testDatabaseConnection();
  await syncDatabase(); 

  // Middlewares
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  // Routes
  app.use('/', AuthRoutes);
  app.use('/categories', CategoriesRoutes);
  app.use('/products', ProductsRoutes);
  app.use('/orders', OrdersRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
}

startApp();