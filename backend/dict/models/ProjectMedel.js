"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Project.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../db/config"));
// Define the model class
class Project extends sequelize_1.Model {
}
Project.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    clientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    startDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('ongoing', 'completed', 'on hold'),
        defaultValue: 'ongoing',
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    managerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    sequelize: config_1.default,
    tableName: 'project_table',
    timestamps: false,
});
exports.default = Project;
