import { z } from "zod"
import type { userSchema } from "@/schema/schemas"

export type iUser = z.infer<typeof userSchema>;
export type iUserFormLogin = Pick<iUser, 'email' | 'password'>;
export type iUserForm = Pick<iUser, 'name' | 'secondName' | 'email' | 'password' | 'reg'>;

export type iRegionSelect = {
    value : string,
    name : string,
    flag : string
}