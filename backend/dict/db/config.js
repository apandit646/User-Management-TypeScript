"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// db.js (Sequelize setup for MySQL)
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('projectmanagement', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});
sequelize
    .authenticate()
    .then(() => {
    console.log('✅ Connected to MySQL via Sequelize');
})
    .catch((err) => {
    console.error('❌ Unable to connect:', err);
});
exports.default = sequelize;
