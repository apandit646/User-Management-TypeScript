import { Router } from "express";
import { authenticateToken } from "../auth/auth";
import {
  createProject,
  getAllProjects,
  deleteProject

} from "../controls/ProjectControllers";
import { getAllProjectEmployee } from "../controls/ProjectTeamController";
import { setprojEmployee } from "../controls/ProjectTeamController";
import { TypeRole } from "../common/Usercommon";
import { authorizeRoles } from "../auth/authorizeRoles";
const router: Router = Router();
// Project routes

router.post('/regProject', authenticateToken, authorizeRoles([TypeRole.MANAGER]), createProject);
router.get('/getProjects', authenticateToken, authorizeRoles([TypeRole.MANAGER]), getAllProjects);
router.delete('/deleteProject/:id', authenticateToken, authorizeRoles([TypeRole.MANAGER]), deleteProject);
router.post('/setprojEmployee', authenticateToken, authorizeRoles([TypeRole.MANAGER]), setprojEmployee);
router.get(
  '/getAll',
  authenticateToken,
  authorizeRoles([TypeRole.EMPLOYEE]),
  getAllProjectEmployee
);

export default router;