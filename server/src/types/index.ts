import { Document } from "mongoose";
import { iBlock } from "./helperModel";

export type tUserClass = Document & {
    name : string,
    secondName : string,
    email : string,
    password : string,
    reg : string,
}

export type tBlogClass = Document & {
    title : string,
    description : string,
    owner : string,
    published : boolean,
    reg : string,
}

export type tPostClass = Document & {
    title : string,
    blocks : iBlock[],
    tags : string[],
    blog : string,
    author : string
}