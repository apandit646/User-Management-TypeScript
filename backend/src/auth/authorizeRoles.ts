import { Request, Response, NextFunction } from "express";

import { RequestHandler } from 'express';

export const authorizeRoles = (roles: string[]): RequestHandler => {
    return (req: Request & { user?: any }, res: Response, next: NextFunction): void => {
        console.log("<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>", req.user.type)
        if (!roles.includes(req.user?.type)) {
            res.status(403).json({ message: 'Access Denied' });
            return;
        }
        next();
    };
}