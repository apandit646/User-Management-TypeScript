import { Router } from "express";
import { authenticateToken } from "../auth/auth";
import {
  createProject,
  getAllProjects,
  deleteProject

} from "../controls/ProjectControllers";
const router: Router = Router();
// Project routes

router.post('/regProject', authenticateToken, createProject);
router.get('/getProjects', authenticateToken, getAllProjects);
router.delete('/deleteProject/:id', authenticateToken, deleteProject);


export default router;