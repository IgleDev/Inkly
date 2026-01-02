import { Document } from "mongoose";

export type tUserClass = Document & {
    userName : string,
    secondName : string,
    email : string,
    password : string,
    reg : number,
    // blogs
}