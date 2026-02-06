import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export function middleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers["authorization"] ?? "";
    
    const token = header.split(" ")[1]; 
    
    if (!token) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId ;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Unauthorized"
        });
    }
}