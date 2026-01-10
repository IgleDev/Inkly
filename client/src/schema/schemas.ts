import { z } from "zod";

export const userSchema = z.object({
    name : z.string(),
    secondName : z.string(),
    email : z.string(),
    password : z.string(),
    reg : z.number(),
})