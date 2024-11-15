// models/Post.js

const { Sequelize, DataTypes } = require('sequelize');
import dotenv from "dotenv";

//For using Dot env files
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
});

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Post;