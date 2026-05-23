import mongoose from 'mongoose';
import Blog from '../models/Blog';
import Post from '../models/Post';
import type { Request, Response } from 'express'
import User from '../models/User';

export class BlogController {
    public static async createBlog(req : Request, res : Response) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { title, description, tags, published, reg, post } = req.body;
            const userId = req.user?._id;

            if(!userId) {
                const error = new Error('No se ha podido identificar el usuario');
                return res.status(401).json({ error : error.message });
            }

            const blog = new Blog({ 
                title, 
                description, 
                tags,
                owner : userId, 
                published, 
                reg 
            })
            await blog.save({ session });

            const newPost = new Post({
                blocks : post.blocks,
                blog : blog._id,
                author : userId
            })

            await newPost.save({ session })
            await session.commitTransaction();
            res.json({blog : blog[0], post : newPost[0]});
        } catch (error) {
            await session.abortTransaction();
            res.status(500).json({error : 'Error al crear el blog'});
        } finally {
            session.endSession();
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

    public static async getBlogByTags(req : Request, res : Response) {
        try {
            const reg = (req.query.reg as string)?.trim().toLowerCase();  
            const tagQuery = (req.query.tag) as string;
            const blogs = await Blog.find({
                published : true,
                reg : reg,
                tags : { $regex : new RegExp(tagQuery, 'i') }
            })
            res.json({blogs});
        } catch (error) {
            res.status(500).json({error : 'Error al obtener los blogs'})
        }
    }

    public static async getBlogById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user?._id;

            const blog = await Blog.findById(id).populate('owner', 'name photoProfile _id');
            if (!blog) {
                return res.status(404).json({ error: 'No se encontró ningún blog asociado a ese ID' });
            }

            const post = await Post.findOne({ blog: id }).populate('author', 'name');
            let isSaved = false;
            if(userId) {
                const user = await User.findById(userId).select('savedBlogs');
                isSaved = user.savedBlogs.some(savedId => savedId.toString() === id) ?? false;
            }
            
            res.json({
                blog,
                blocks: post?.blocks || [],
                author: (post?.author as any)?.name || null,
                isSaved
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el blog' });
        }
    }

    public static async updateBlogPublished(req : Request, res : Response) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { id } = req.params;
            const { title, description, tags, published, reg, post } = req.body;
            const userId = req.user?._id;

            if(!userId) {
                const error = new Error('No se ha podido identificar el usuario');
                return res.status(401).json({ error : error.message });
            }

            if(!id) {
                const error = new Error('No se pudo identificar el blog');
                return res.status(404).json({ error : error.message });
            }

            const blog = await Blog.findByIdAndUpdate(id, { title, description, tags, published, reg, }, { session, new: true });
            if (blog.owner.toString() !== userId.toString()) {
                const error = new Error('No tienes permisos para editar este blog');
                return res.status(403).json({ error: error.message });
            }
            await Post.findOneAndUpdate({ blog: id }, { blocks: post.blocks }, { session });
            await session.commitTransaction();
            res.json({ message: 'Blog actualizado correctamente' });
        } catch (error) {
            await session.abortTransaction();
            res.status(500).json({ error : 'Error al editar el blog'});
        } finally {
            session.endSession();
        }
    }

    public static async deleteBlog(req : Request, res : Response) {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { id } = req.params;

        try {
            const blog = await Blog.findById(id);
            if(!blog) {
                const error = new Error('No se encontró ningún blog asociado a ese ID');
                return res.status(404).json({ error : error.message })
            }
            await Blog.deleteOne({ _id : id}).session(session);
            await Post.deleteOne({ blog : id }).session(session);
            await session.commitTransaction();
            res.status(200).json({ message: 'Blog eliminado correctamente' });
        } catch (error) {
            await session.abortTransaction();
            res.status(500).json({error : 'Error al eliminar el blog'});
        } finally {
            session.endSession();
        }
    }

    public static async setSavedBlog(req : Request, res : Response) {
        const { blogId } = req.body;
        const userId = req.user?._id;
        try {
            if(!userId) {
                const error = new Error('No se encontró al usuario');
                return res.status(401).json({ error : error.message });
            }
            const blog = await Blog.findById(blogId);
            if(!blog) {
                const error = new Error('No se encontró el blog');
                return res.status(404).json({ error : error.message });
            }
            const user = await User.findById(userId);
            const alreadySaved = user.savedBlogs.some((id : any) => id.toString() === blogId);
            
            if(alreadySaved) {
                user.savedBlogs = user.savedBlogs.filter((id : any) => id.toString() !== blogId);
                await user.save();
                return res.json({ isSaved: false, message: 'Blog eliminado de guardados' });
            } else {
                user.savedBlogs.push(blogId);
                await user.save();
                return res.json({ isSaved: true, message: 'Blog guardado correctamente' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar el blog' });
        }
    }
}