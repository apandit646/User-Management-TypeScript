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
exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const config_1 = __importDefault(require("../db/config"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const secretKey = crypto_1.default
    .createHash('sha256')
    .update(String('your-secret-key'))
    .digest('base64')
    .substr(0, 32);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNo, type, role, password } = req.body;
        try {
            yield config_1.default.sync(); // Create table if it doesn't exist
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create users table' });
            return;
        }
        const existingUser = yield UserModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const newUser = yield UserModel_1.default.create({
            name,
            email,
            phoneNo,
            type,
            role,
            password, // Remember to hash passwords in production
        });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModel_1.default.findOne({ where: { email, password } });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email }, secretKey, { expiresIn: '10h' } // Token expires in 1 hour
        );
        console.log("User logged in successfully:", user.id);
        res.status(200).json({
            message: "Login successful",
            token,
            users: {
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNo: user.phoneNo,
                type: user.type,
                role: user.role
            }
        });
        return;
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;
        const users = yield UserModel_1.default.findAndCountAll({
            where: {
                type: 'employee' // Assuming you want to fetch only employees
            },
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
