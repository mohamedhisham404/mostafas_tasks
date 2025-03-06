import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const Author = sequelize.define("Author", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Author;
