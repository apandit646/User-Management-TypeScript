import { Router } from "express";
import { authenticateToken } from "../auth/auth";
const router: Router = Router();
import {
    loginEmployee,
    createEmployee,
    getAllEmployees,
    handleDeleteEmployee
} from "../controls/EmployeeController";

// Employee routes

// employeee routes
router.post('/loginEmployee', loginEmployee);
router.post('/registerEmployee', authenticateToken, createEmployee);
router.get('/getAllEmployees', authenticateToken, getAllEmployees);
router.delete('/deleteEmployee/:id', authenticateToken, handleDeleteEmployee);


export default router;