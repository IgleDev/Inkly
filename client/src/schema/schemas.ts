import { z } from "zod";

// User Schema
export const userSchema = z.object({
    name : z.string(),
    secondName : z.string(),
    email : z.string(),
    password : z.string(),
    reg : z.string(),
})

// Blog Schema
export const blogSchema = z.object({
    title : z.string(),
    description : z.string().optional(),
    owner : z.string(),
    published : z.boolean(),
    reg : z.string(),
})

// Post Schema
export const postSchema = z.object({
    blocks : z.array(z.object({
        type : z.enum(['paragraph', 'heading', 'image', 'video', 'quote']),
        value : z.any(),
        order : z.number()
    })),
    tags : z.array(z.string()),
    blog : z.string(),
    author : z.string(),
})