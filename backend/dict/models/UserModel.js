"use strict";
// models/User.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../db/config")); // your Sequelize instance
// Define the model using `sequelize.define`
const User = config_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNo: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('employee', 'manager'),
        defaultValue: 'employee',
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('backend developer', 'frontend developer', 'uiux develper', 'developer'),
        defaultValue: 'developer',
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});
exports.default = User;
