import { Request, Response, NextFunction } from "express";
import jwt, { decode }  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function middleware (req:Request,res:Response,next:NextFunction){
    const header =  req.headers["authorization"]?? "";
    
    const decoded = jwt.verify(token , JWT_SECRET)
    if(decoded){
        req.userId = decoded.userId
        next();
    }else{
        res.status(403).json({
            message:"Unauthorized"
        })
    }
}