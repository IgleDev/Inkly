import { z } from "zod";

// User Schema
export const userSchema = z.object({
    _id : z.string(),
    name : z.string(),
    secondName : z.string(),
    description : z.string(),
    photoProfile : z.string(),
    email : z.string(),
    password : z.string(),
    reg : z.string(),
    savedBlogs : z.array(z.string())
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
    team : z.string().optional(),
    createdAt : z.string(),
    updatedAt : z.string(),
})

export const blogsResponseSchema = z.object({
    blogs: z.array(blogSchema)
});

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
});

export const accountSchema = z.object({
    user: userSchema,
    blogs: z.array(
        blogSchema.nullable(),
    )
});

export const blogReadSchema = z.object({
    blog: blogSchema.extend({
        owner: z.object({
            _id : z.string(),
            name: z.string(),
            photoProfile: z.string()
        })
    }),
    team: z.array(
        z.object({
            _id: z.string(),
            name: z.string(),
            photoProfile: z.string().optional()
        })
    ),
    blocks: z.array(blockSchema),
    author: z.string().nullable(),
    isSaved : z.boolean()
});

export const userFormSchema = userSchema.pick({
  name: true,
  secondName: true,
  email: true,
  password: true,
  reg: true,
}).extend({
  privacidad: z.boolean().refine(val => val === true, {
    message: "Debes aceptar la política de privacidad"
  })
});