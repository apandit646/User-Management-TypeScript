import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config';

enum statusEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}
enum roleEnum {
    DEVELOPER = 'developer',
    MANAGER = 'manager',
    TESTER = 'tester',
    DESIGNER = 'designer'
}

interface ProjectTeamAttributes {
    id: number;
    projectId: number;
    userId: number;
    role: roleEnum;
    managerId?: number; // Optional, if needed
    status: statusEnum;
}

interface ProjectTeamCreationAttributes extends Optional<ProjectTeamAttributes, 'id'> { }

class ProjectTeam extends Model<ProjectTeamAttributes, ProjectTeamCreationAttributes> implements ProjectTeamAttributes {
    public id!: number;
    public projectId!: number;
    public userId!: number;
    public managerId?: number; // Optional, if needed
    public role!: roleEnum;
    public status!: statusEnum;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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
            model: 'projects', // Assuming you have a 'projects' table
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Assuming you have a 'users' table
            key: 'id'
        }
    },
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // Assuming you have a 'users' table
            key: 'id'
        }
    },
    role: {
        type: DataTypes.ENUM('developer', 'manager', 'tester', 'designer'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'project_teams'
});

export default ProjectTeam;
