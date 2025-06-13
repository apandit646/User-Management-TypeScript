"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.createProject = void 0;
const config_1 = __importDefault(require("../db/config"));
const ProjectMedel_1 = __importDefault(require("../models/ProjectMedel"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { projectName, clientName, startDate, endDate, status, description } = req.body;
        const managerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming the user ID is stored in req.user after authentication
        if (!managerId) {
            res.status(400).json({ message: "Manager ID is required" });
            return;
        }
        try {
            yield config_1.default.sync(); // Create table if it doesn't exist
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create projects table' });
            return;
        }
        const newProject = yield ProjectMedel_1.default.create({
            projectName,
            clientName,
            startDate,
            endDate,
            status,
            description,
            managerId
        });
        res.status(201).json({ message: "Project registered successfully", project: newProject });
        return;
    }
    catch (error) {
        console.error("Error registering project:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.createProject = createProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("Fetching all projects for manager:", (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    console.log("Offset:", offset, "Limit:", limit);
    try {
        const projects = yield ProjectMedel_1.default.findAndCountAll({
            where: {
                managerId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
            },
            offset,
            limit,
            order: [['id', 'ASC']] // Using 'id' since `timestamps` are disabled
        });
        console.log("Projects fetched:", projects.rows.length, "projects found");
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllProjects = getAllProjects;
// // Uncomment and implement these functions as needed
// export const getProjectById = async (req: Request, res: Response): Promise<void> => {
//   const projectId = req.params.id;
//   try {
//     const project = await Project.findByPk(projectId);
//     if (!project) {
//       res.status(404).json({ message: "Project not found" });
//       return;
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     console.error("Error fetching project:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
