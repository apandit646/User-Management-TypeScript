// models/Project.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config';

enum statusEnum {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  ON_HOLD = 'on hold',
}
// Define the attributes for the model
interface ProjectAttributes {
  id: number;
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status?: statusEnum;
  description?: string;
  managerId: number;
}

// Allow some fields to be optional when creating a project
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'status' | 'description'> { }
// Define the model class
class Project extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes {
  public id!: number;
  public projectName!: string;
  public clientName!: string;
  public startDate!: string;
  public endDate!: string;
  public status!: statusEnum;
  public description?: string;
  public managerId!: number;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(statusEnum.ONGOING, statusEnum.COMPLETED, statusEnum.ON_HOLD),
      defaultValue: statusEnum.ONGOING,
    },

    description: {
      type: DataTypes.TEXT,
    },

    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'project_table',
    timestamps: false,
  }
);

export default Project;
