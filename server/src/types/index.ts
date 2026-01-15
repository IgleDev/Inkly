import { Document } from "mongoose";

export type tUserClass = Document & {
    name : string,
    secondName : string,
    email : string,
    password : string,
    reg : string,
    // blogs
}