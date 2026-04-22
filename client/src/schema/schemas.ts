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
    _id : z.string(),
    title : z.string(),
    description : z.string().optional(),
    tags : z.array(z.string()),
    owner : z.string(),
    published : z.boolean(),
    reg : z.string(),
})

// Heading Schema
export const headingBlock = z.object({
  type: z.literal("heading"),
  value: z.string(),
  description: z.string().optional(),
  order: z.number()
});

// Párrafo Schema
export const paragraphBlock = z.object({
  type: z.literal("paragraph"),
  value: z.string(),
  description: z.string().optional(),
  order: z.number()
});

// Quote Schema
export const quoteBlock = z.object({
  type: z.literal("quote"),
  value: z.string(),
  description: z.string().optional(),
  order: z.number()
});

// Imagen Schema
export const imageBlock = z.object({
    type: z.literal("image"),
    value: z.string(), // URL
    description: z.string().optional(),
    order: z.number()
});

// Video Schema
export const videoBlock = z.object({
    type: z.literal("video"),
    value: z.string(), // URL
    description: z.string().optional(),
    order: z.number()
});

export const blockSchema = z.discriminatedUnion("type", [ headingBlock, paragraphBlock, quoteBlock, imageBlock, videoBlock ]);

// Post Schema
export const postSchema = z.object({
    _id : z.string(),
    blocks : z.array(blockSchema),
    blog : z.string(),
    author : z.string(),
})

export const accountSchema = z.object({
    user: userSchema,
    blogs: z.array(
        blogSchema.nullable(),
    )
})