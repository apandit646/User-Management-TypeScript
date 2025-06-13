import sequeliz from "../db/config"
import e, { Request, Response } from "express";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const secretKey = crypto
  .createHash('sha256')
  .update(String('your-secret-key'))
  .digest('base64')
  .substr(0, 32);

interface UserInput {
  name: string;
  email: string;
  phoneNo: string;
  type: 'employee' | 'manager'; 
  role: 'backend developer' | 'frontend developer' | 'uiux develper' | 'developer'; 
  password: string;
}
interface UserLoginInput {
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNo, type, role, password } = req.body as UserInput;

    try {
        await sequeliz.sync(); // Create table if it doesn't exist
    } catch (error) {
        res.status(500).json({ error: 'Failed to create users table' });
        return;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = await User.create({
        name,
        email,
        phoneNo,
        type,
        role,
        password, // Remember to hash passwords in production
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const { email, password } = req.body as UserLoginInput;

    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      secretKey,
      { expiresIn: '10h' } // Token expires in 1 hour
    );
    console.log("User logged in successfully:",user.id);
    
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
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {

    const users = await User.findAll({
      where: {
        type: 'employee' // Assuming you want to fetch only employees
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
