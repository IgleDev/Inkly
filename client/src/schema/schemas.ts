import { z } from "zod";

export const userSchema = z.object({
    userName : z.string(),
    secondName : z.string(),
    email : z.string(),
    password : z.string(),
    reg : z.number(),
})