import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const Category = sequelize.define("Category", {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    parentCategoryId: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },
});

export default Category;
