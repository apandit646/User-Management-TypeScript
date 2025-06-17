import sequelize from "../db/config"
import { Request, Response } from "express";
import User from "../models/UserModel";
import { generateToken } from "../auth/auth";

enum typeEnum {
    EMPLOYEE = 'employee',
    MANAGER = 'manager'
}
enum roleEnum {
    BACKEND_DEVELOPER = 'backend developer',
    FRONTEND_DEVELOPER = 'frontend developer',
    UIUX_DEVELOPER = 'uiux develper',
    DEVELOPER = 'developer'
}
interface refEmployeeInput {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    type: typeEnum;
    role?: roleEnum;
}

// login for employee portal 

export const loginEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Employee login attempt:", req.body);
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        sequelize.sync()
            .then(() => {
                console.log('✅ Database synced successfully.');
            })
            .catch((err) => {
                console.error('❌ Failed to sync database:', err);
            })
        const employee = await User.findOne({ where: { email, password } });
        if (!employee) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Create a JWT token
        if (employee.id === undefined) {
            res.status(500).json({ message: "Employee ID is missing" });
            return;
        }
        const token = generateToken({
            id: employee.id,
            name: employee.name,
            email: employee.email
        });

        console.log("Employee logged in successfully:😂", employee.id);
        res.status(200).json({
            message: "Employee logged in successfully😊 ",
            employee: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                phoneNo: employee.phoneNo,
                type: employee.type,
                role: employee.role,
            },
            token: token
        });
    } catch (error) {
        console.error("Error logging in employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Registering new employee:", req.body);
        const { name, email, phoneNo, password, type, role } = req.body as refEmployeeInput;
        if (!name || !email || !phoneNo || !password || !type || !role) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        await sequelize.sync()
            .then(() => {
                console.log('✅ Database synced successfully.');
            })
            .catch((err) => {
                console.error('❌ Failed to sync database:', err);
            })


        const existingEmployee = await User.findOne({ where: { email } });
        if (existingEmployee) {
            res.status(400).json({ message: "Employee already exists" });
            return;
        }
        const newEmployee = await User.create({
            name,
            email,
            phoneNo,
            password,
            type,
            role: role ?? roleEnum.DEVELOPER
        });

        res.status(201).json({
            message: "Employee registered successfully",
            employee: newEmployee
        });
    } catch (error) {
        console.error("Error registering employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// to get all employees of a manager
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Fetching all employees");
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;
        console.log("Offset:", offset, "Limit:", limit);
        const employees = await User.findAndCountAll({
            where: { type: 'employee' },
            offset,
            limit,
            order: [['id', 'DESC']],
        });
        console.log("Employees fetched:", employees.count, employees.rows);
        res.status(200).json({
            message: "Employees fetched successfully", employees: employees.rows,
            total: employees.count
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const handleDeleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const employeeId = req.params.id;
        console.log("Deleting employee with ID:", employeeId);
        const employee = await User.findByPk(employeeId);
        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        await employee.destroy();
        console.log("Employee deleted successfully:", employeeId);
        res.status(204).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}