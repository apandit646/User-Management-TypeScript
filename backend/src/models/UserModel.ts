// models/User.ts

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../db/config'; // your Sequelize instance
import { UserAttributes, UserCreationAttributes } from '../common/Usercommon'; // import user attributes

// Use `Model` generic with `UserAttributes` and `UserCreationAttributes`
type UserInstance = Model<UserAttributes, UserCreationAttributes> & UserAttributes;

// Define the model using `sequelize.define`
const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phoneNo: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },

  type: {
    type: DataTypes.ENUM('employee', 'manager'),
    defaultValue: 'employee',
  },

  role: {
    type: DataTypes.ENUM(
      'backend developer',
      'frontend developer',
      'uiux develper',
      'developer'
    ),
    defaultValue: 'developer',
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;

