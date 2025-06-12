"use strict";
// src/middleware/authenticateToken.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a 256-bit key for AES encryption
const secretKey = crypto_1.default
    .createHash('sha256')
    .update(String('your-secret-key'))
    .digest('base64')
    .substr(0, 32);
// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    console.log("Authenticating token...", req.headers);
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err || typeof decoded !== 'object') {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = decoded; // Attach decoded user to req
        next();
    });
};
exports.authenticateToken = authenticateToken;
