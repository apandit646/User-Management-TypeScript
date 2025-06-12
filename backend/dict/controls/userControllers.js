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
exports.registerUser = void 0;
const config_1 = __importDefault(require("../db/config"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
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
