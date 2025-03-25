import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import dotenv from "dotenv";

dotenv.config('../.env');

const sequelize = new Sequelize({
    database: process.env.DATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: 'localhost',
    dialect: PostgresDialect,
    port: process.env.PGPORT,
});

export default sequelize;
