import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";
import User from "./user.js";

const Order = sequelize.define("Order", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
});

export default Order;   
