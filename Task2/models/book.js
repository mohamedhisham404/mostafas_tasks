import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const Book = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishedDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Book;
