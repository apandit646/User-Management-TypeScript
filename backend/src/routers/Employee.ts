import { Router } from "express";
import { authenticateToken } from "../auth/auth";
const router: Router = Router();
import {
    loginEmployee,
    createEmployee,
    getAllEmployees,
    handleDeleteEmployee
} from "../controls/EmployeeController";
import { authorizeRoles } from "../auth/authorizeRoles";
import { TypeRole } from "../common/Usercommon";

// Employee routes

// employeee routes
router.post('/loginEmployee', loginEmployee);
router.post('/registerEmployee', authenticateToken, createEmployee);
router.get('/getAllEmployees', authenticateToken, authorizeRoles([TypeRole.MANAGER]), getAllEmployees);
router.delete('/deleteEmployee/:id', authenticateToken, authorizeRoles([TypeRole.MANAGER]), handleDeleteEmployee);


export default router;