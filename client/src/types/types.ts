import { z } from "zod"
import type { userSchema } from "@/schema/schemas"

export type iUser = z.infer<typeof userSchema>;
export type iUserForm = Pick<iUser, 'userName' | 'secondName' | 'email' | 'password' | 'reg'>;