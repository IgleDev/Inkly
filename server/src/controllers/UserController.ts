import User from '../models/User'
import type { Request, Response } from 'express'
import { checkPassword, hashPassword } from '../utils/bcrypt';
import { generateJWT } from '../utils/jwt';
import Blog from '../models/Blog';

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
            res.status(500).send({ error: 'Error del servidor' });
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

    public static getUserById = async (req : Request, res : Response) => {
        try {
            const user = await User.findById(req.params.id).select('name secondName description email reg');
            if (!user) {
                const error = new Error('Usuario no encontrado');
                return res.status(404).send({ error: error.message });
            }
            const blogs = await Blog.find({ owner : user._id }).select('title description tags published createdAt updatedAt');
            res.json({ user, blogs });
        } catch (error) {
            res.status(500).send({ error: 'Error del servidor' });        
        }
    }

    public static getUserByName = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ name: req.params.name }).select('name secondName email reg');
            if (!user) {
                const error = new Error('Usuario no encontrado');
                return res.status(404).send({ error: error.message });
            }
            const blogs = await Blog.find({ owner : user._id }).select('title description tags');
            res.json({ user, blogs });
        } catch (error) {
            res.status(500).send({ error: 'Error del servidor' });
        }
    }

    public static updateUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.params.id);
            const { name, secondName, description, email, reg } = req.body;

            if (!user) {
                const error = new Error('Usuario no encontrado');
                return res.status(404).send({ error: error.message });
            }

            user.name = name;
            user.secondName = secondName;
            user.description = description;
            user.email = email;
            user.reg = reg;

            await user.save();
            res.json({ user });
        } catch (error) {
            res.status(500).send({ error: 'Error del servidor' });
        }
    };
}