import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export default Product;