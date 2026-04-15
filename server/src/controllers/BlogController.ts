import mongoose from 'mongoose';
import Blog from '../models/Blog';
import Post from '../models/Post';
import type { Request, Response } from 'express'

export class BlogController {
    public static async createBlog(req : Request, res : Response) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { title, description, post } = req.body;
            const userId = req.user?._id;

            if(!userId) {
                const error = new Error('No se ha podido identificar el usuario');
                return res.status(401).json({ error : error.message });
            }

            const blog = new Blog({title, description, owner : userId})
            await blog.save({ session });

            const newPost = new Post({
                blocks : post.blocks,
                tags : post.tags,
                blog : blog._id,
                author : userId
            })

            await newPost.save({ session })
            await session.commitTransaction();
            res.json({blog : blog[0], post : newPost[0]});
        } catch (error) {
            await session.abortTransaction();
            res.status(500).json({error : 'Error al crear el blog'});
        }
    }

    public static async getAllBlogs(req : Request, res : Response) {
        try {
            const reg = (req.query.reg as string)?.trim().toLowerCase();  
            const blogs = await Blog.find({ published : true, reg : reg});
            res.json({blogs})
        } catch (error) {
            res.status(500).json({error : 'Error al obtener los blogs'})
        }
    }
}