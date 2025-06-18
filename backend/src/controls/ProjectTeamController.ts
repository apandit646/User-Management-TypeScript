import sequelize from "../db/config"
import { Request, Response } from "express";
import ProjectTeam from "../models/ProjectTeamModel";
import User from "../models/UserModel";
import Project from "../models/ProjectMedel";
import { off } from "process";
import { Model } from "sequelize";
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

export const setprojEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Assigning employee to project:", req.body);
        const data = req.body;
        const mangerId = req.user?.id; // Assuming the user ID is stored in req.user after authentication
        if (!mangerId) {
            res.status(400).json({ message: "Manager ID is required" });
            return;
        }
        sequelize.sync()
            .then(() => {
                console.log('✅ Database synced successfully.');
            })
            .catch((err) => {
                console.error('❌ Failed to sync database:', err);
            })
        for (const item of data) {
            console.log(item);
            const regdata = await ProjectTeam.create({
                projectId: parseInt(item.projectId),
                userId: parseInt(item.id),
                managerId: mangerId,
                role: item.role as roleEnum, // Ensure the role is of type roleEnum
                status: statusEnum.ACTIVE
            });

            if (!regdata) {
                res.status(400).json({ message: "Failed to assign one or more members" });
                return;
            }
        }
        res.status(201).json({ message: "Members assigned successfully" });
    } catch (error) {
        console.error("Error assigning members to project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// get project team members
export const getAllProjectEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const projectTeam = await ProjectTeam.findAndCountAll({
            where: { userId },
            offset,
            limit,
            order: [['id', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: Project,
                    as: 'project',
                    attributes: ['id', 'projectName']
                },
                {
                    model: User,
                    as: 'manager',
                    attributes: ['id', 'name']
                }
            ]
        });

        if (projectTeam.count === 0) {
            res.status(404).json({ message: "No project team members found" });
            return;
        }

        res.status(200).json({
            message: "Project team members fetched successfully",
            projectTeam: projectTeam.rows,
            total: projectTeam.count
        });
    } catch (error) {
        console.error("Error fetching project team members:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
