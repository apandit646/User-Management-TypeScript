import sequeliz from "../db/config"
import { Request, Response } from "express";
import User from "../models/UserModel";

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
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Registering new employee:", req.body);
        const { name, email, phoneNo, password, type, role } = req.body as refEmployeeInput;

        // ✅ Basic validation
        if (!name || !email || !phoneNo || !password || !type || !role) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        // ✅ Ensure table exists
        try {
            await sequeliz.sync();
        } catch (error) {
            res.status(500).json({ error: "Failed to create employees table" });
            return;
        }

        // ✅ Check if user already exists
        const existingEmployee = await User.findOne({ where: { email } });
        if (existingEmployee) {
            res.status(400).json({ message: "Employee already exists" });
            return;
        }

        // ✅ Hash the password


        // ✅ Create employee
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
