import User from '../models/User'
import type { Request, Response } from 'express'
import { hashPassword } from '../utils/bcrypt';

export class UserController {
    public static createUser = async (req : Request, res : Response) => {
        const user = new User(req.body);
        user.password = await hashPassword(user.password);  // Ciframos contrasinal
        try {
            await user.save();
            res.send('Usuario Registrado correctamente')
        } catch (error) {
            throw new Error
        }
    }
}