import sequelize from "../db/config"
import { Request, Response } from "express";
import Project from "../models/ProjectMedel";
import User from "../models/UserModel";
import { syncDatabase } from "../db/sync";

enum statusEnum {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  ON_HOLD = 'on hold',
}
interface regProjectInput {
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status?: statusEnum;
  description?: string;
  managerId: number;
}

// Define the project creation input interface
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectName, clientName, startDate, endDate, status, description } = req.body as regProjectInput;
    const managerId = req.user?.id; // Assuming the user ID is stored in req.user after authentication
    if (!managerId) {
      res.status(400).json({ message: "Manager ID is required" });
      return;
    }

    await syncDatabase()

    const newProject = await Project.create({
      projectName,
      clientName,
      startDate,
      endDate,
      status,
      description,
      managerId
    })
    res.status(201).json({ message: "Project registered successfully", project: newProject });
    return;
  } catch (error) {
    console.error("Error registering project:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

// to get all projects of a manager

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  console.log("Fetching all projects for manager:", req.user?.id);
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  console.log("Offset:", offset, "Limit:", limit);
  syncDatabase()
  try {
    const projects = await Project.findAndCountAll({
      where: {
        managerId: req.user?.id
      },
      offset,
      limit,
      order: [['id', 'ASC']],// Using 'id' since `timestamps` are disabled
      include: {
        model: User,
        as: 'manager',
        attributes: ['id', 'name']
      }
    });
    console.log("Projects fetched:", projects.rows.length, "projects found");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
// to delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.id;
  console.log("Deleting project with ID:", projectId);
  try {
    const project = await Project.findByPk(parseInt(projectId));
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    await syncDatabase()

    await project.destroy().then(() => {
      console.log("Project deleted successfully:", projectId);
      res.status(204).json({ message: "Project deleted successfully" });
      return;
    }).catch((error) => {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
      return;
    });

  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// // Uncomment and implement these functions as needed
// to show the project details
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  const projectId = req.params.id;
  try {
    await syncDatabase()
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    console.log("Project found:", project);

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}