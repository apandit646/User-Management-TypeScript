import sequelize from "../db/config"
import { Request, Response } from "express";
import ProjectTeam from "../models/ProjectTeamModel";
import User from "../models/UserModel";
import Project from "../models/ProjectMedel";
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