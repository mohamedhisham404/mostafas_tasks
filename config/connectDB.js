import sequelize from "../config/database.js";

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

export { testDatabaseConnection, syncDatabase };