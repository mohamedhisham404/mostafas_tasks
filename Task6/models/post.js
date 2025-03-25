import { DataTypes } from "@sequelize/core";
import sequelize from "../../config/database.js";

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Post;