import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import AuthorRoutes from './routes/AuthorRoutes.js';
import { testDatabaseConnection, syncDatabase } from '../config/connectDB.js';

dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 3000;

async function startApp() {
  await testDatabaseConnection();
  await syncDatabase(); 

  // Middlewares
  app.use(bodyParser.json());

  // Routes
  app.use('/authors', AuthorRoutes);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
}

startApp();