// src/models/associateModels.ts

import Project from './ProjectMedel';
import ProjectTeam from './ProjectTeamModel';
import User from './UserModel';

export const associateModels = () => {
    Project.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });
    ProjectTeam.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    ProjectTeam.belongsTo(User, { foreignKey: 'managerId', as: 'manager' });
    ProjectTeam.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });


};
