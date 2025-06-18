import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config';
import User from './UserModel';
import Project from './ProjectMedel'; // ✅ Fixed typo

// Enums
export enum statusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum roleEnum {
    DEVELOPER = 'developer',
    MANAGER = 'manager',
    TESTER = 'tester',
    DESIGNER = 'designer'
}

// Interfaces
interface ProjectTeamAttributes {
    id: number;
    projectId: number;
    userId: number;
    role: roleEnum;
    managerId?: number;
    status: statusEnum;
}

interface ProjectTeamCreationAttributes extends Optional<ProjectTeamAttributes, 'id'> { }

// Model class
class ProjectTeam extends Model<ProjectTeamAttributes, ProjectTeamCreationAttributes> implements ProjectTeamAttributes {
    public id!: number;
    public projectId!: number;
    public userId!: number;
    public role!: roleEnum;
    public managerId?: number;
    public status!: statusEnum;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Init model
ProjectTeam.init({
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
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    role: {
        type: DataTypes.ENUM(...Object.values(roleEnum)),
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

ProjectTeam.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ProjectTeam.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
ProjectTeam.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });

export default ProjectTeam;
