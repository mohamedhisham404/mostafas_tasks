import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
        allowNull: false,
    }
});

export default User;