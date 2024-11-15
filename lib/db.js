// lib/db.js
import dotenv from "dotenv";
import Sequelize from 'sequelize';

//For using Dot env files
dotenv.config();
// Create a new instance of Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    logging: false,
});

export default sequelize