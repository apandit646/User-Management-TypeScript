import { Router } from "express";
import { authenticateToken } from "../auth/auth";
import {
  createProject,
  getAllProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
} from "../controls/ProjectControllers";
const router: Router = Router();
// Project routes

router.post('/regProject', authenticateToken, createProject);
router.get('/getProjects', authenticateToken, getAllProjects);
// router.post('/setprojEmployee', authenticateToken, setprojectMember);
// router.get('/deleteProject/:id', authenticateToken, deleteProject);

export default router;