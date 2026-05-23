import { z } from "zod"
import type { BLOCK_TYPES } from "./helperTypes";
import type { accountSchema, blockSchema, blogReadSchema, blogSchema, postSchema, userSchema } from "@/schema/schemas"

// Usuarios
export type iUser = z.infer<typeof userSchema>;
export type iUserFormLogin = Pick<iUser, 'email' | 'password'>;
export type iUserForm = Pick<iUser, 'name' | 'secondName' | 'email' | 'password' | 'reg'>;
export type iUserFormEdit = Pick<iUser, 'name' | 'secondName' | 'description' | 'email' | 'reg' | "photoProfile">;

// Blogs
export type iBlog = z.infer<typeof blogSchema>;
export type iBlogRead = z.infer<typeof blogReadSchema>;
export type iBlogPresentation = Pick<iBlog, '_id' | 'title' | 'description' | 'tags'>;
export type iBlogAccount = Pick<iBlog, '_id' | 'title' | 'description' | 'tags' | 'published' |'createdAt' | 'updatedAt'>;

// Blocks
export type iPost = z.infer<typeof postSchema>
export type tBlockType = typeof BLOCK_TYPES[keyof typeof BLOCK_TYPES];
export type iBlock = z.infer<typeof blockSchema>;

// Account
export type iAccount = z.infer<typeof accountSchema>