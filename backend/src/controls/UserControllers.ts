import sequeliz from "../db/config"
import { Request, Response } from "express";
import User from "../models/UserModel";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNo, type, role, password } = req.body;

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
