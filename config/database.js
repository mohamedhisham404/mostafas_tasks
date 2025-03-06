import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

const sequelize = new Sequelize({
    database: "books",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: "localhost",
    dialect: PostgresDialect,
    port: 5432,
});

export default sequelize;
