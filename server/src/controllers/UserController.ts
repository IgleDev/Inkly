import User from '../models/User'
import type { Request, Response } from 'express'
import { hashPassword } from '../utils/bcrypt';

export class UserController {
    public static createUser = async (req : Request, res : Response) => {
        const { email } = req.body;
        const userExist = await User.findOne({ email });
        if(userExist) {
            const error = new Error('Este correo ya está asociado a una cuenta');
            return res.status(409).send({ error : error.message });
        }
        const user = new User(req.body);
        user.password = await hashPassword(user.password);  // Ciframos contrasinal
        try {
            await user.save();
            res.send('Usuario Registrado correctamente');
        } catch (error) {
            throw new Error
        }
    }
}