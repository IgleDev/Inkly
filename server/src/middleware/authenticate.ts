import jwt from 'jsonwebtoken'
import User from '../models/User';
import type { tUserClass } from "../types/index";
import type { Request, Response, NextFunction } from "express";
import { Document } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user : tUserClass & Document
        }
    }
}

export const authenticate = async(req : Request, res : Response, next : NextFunction) => {
    const bearer = req.headers.authorization
    if(!bearer) {
        const error = new Error('No autorizado');
        return res.status(401).json({ error : error.message })
    }
    const [, token] = bearer.split(' '); 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(typeof decoded === 'object' && decoded.payload.id) {
            const user = await User.findById(decoded.payload.id).select('_id name email')
            if(user) {
                req.user = user;
                next();
            } else {
                return res.status(500).json({error : 'Token no validao'})
            }
        }
    } catch (error) {
        return res.status(500).json({error : 'Token no valido'})
    }
}

export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) return next();
    const [, token] = bearer.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.payload.id) {
            const user = await User.findById(decoded.payload.id).select('_id name email');
            if (user) req.user = user;
        }
    } catch {}
    next();
}