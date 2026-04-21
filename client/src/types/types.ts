import { z } from "zod"
import type { blockSchema, blogSchema, postSchema, userSchema } from "@/schema/schemas"
import type { BLOCK_TYPES } from "./helperTypes";

// Usuarios
export type iUser = z.infer<typeof userSchema>;
export type iUserFormLogin = Pick<iUser, 'email' | 'password'>;
export type iUserForm = Pick<iUser, 'name' | 'secondName' | 'email' | 'password' | 'reg'>;

// Blogs
export type iBlog = z.infer<typeof blogSchema>;
export type iBlogPresentation = Pick<iBlog, '_id' | 'title' | 'description' | 'tags'>;

// Blocks
export type iPost = z.infer<typeof postSchema>
export type tBlockType = typeof BLOCK_TYPES[keyof typeof BLOCK_TYPES];
export type iBlock = z.infer<typeof blockSchema>;