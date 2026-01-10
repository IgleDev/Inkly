import User from '../models/User'
import type { Request, Response } from 'express'
import { checkPassword, hashPassword } from '../utils/bcrypt';
import { generateJWT } from '../utils/jwt';

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

    public static loginUser = async (req : Request, res : Response) => {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if(!userExist) {
            const error = new Error('Este correo no está asociado a ninguna cuenta');
            return res.status(401).send({ error : error.message });
        }

        const isPasswordCorrect = await checkPassword(password, userExist.password);
        if(!isPasswordCorrect) {
            const error = new Error('Este correo no está asociado a ninguna cuenta');
            return res.status(401).send({ error : error.message });
        }

        const token = generateJWT({id : userExist._id})
        res.send(token);
    }

    public static user = async (req : Request, res : Response) => {
        return res.json(req.user);
    }
}