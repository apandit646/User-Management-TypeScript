import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config';
import User from './UserModel';
import Project from './ProjectMedel';
import { AllowNull } from 'sequelize-typescript';

export enum statusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

interface StatusModelAttributes {
    id: number;
    projectId: number;
    userId: number;
    activeTime: string;
    inactiveTime: string;
    totalTime: string;
    dateCheck: string;
    status: statusEnum;
}

interface StatusModelCreationAttributes extends Optional<StatusModelAttributes, 'id'> { }

// Model class
class StatusModel extends Model<StatusModelAttributes, StatusModelCreationAttributes>
    implements StatusModelAttributes {
    public id!: number;
    public projectId!: number;
    public userId!: number;
    public activeTime!: string;
    public inactiveTime!: string;
    public totalTime!: string;
    public dateCheck!: string;
    public status!: statusEnum;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StatusModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    activeTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    inactiveTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    totalTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    dateCheck: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(...Object.values(statusEnum)),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'project_teams',
    timestamps: true
});

export default StatusModel;
