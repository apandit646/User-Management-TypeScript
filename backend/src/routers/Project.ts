import { Router } from "express";
import { authenticateToken } from "../auth/auth";
import {
  createProject,
  getAllProjects,
  deleteProject

} from "../controls/ProjectControllers";
import { getAllProjectEmployee } from "../controls/ProjectTeamController";
import { setprojEmployee } from "../controls/ProjectTeamController";
const router: Router = Router();
// Project routes

router.post('/regProject', authenticateToken, createProject);
router.get('/getProjects', authenticateToken, getAllProjects);
router.delete('/deleteProject/:id', authenticateToken, deleteProject);
router.post('/setprojEmployee', authenticateToken, setprojEmployee);
router.get('/getAll', authenticateToken, getAllProjectEmployee);

export default router;