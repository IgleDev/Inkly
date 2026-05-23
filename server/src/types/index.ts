import { iBlock } from "./helperModel";
import { Document, Types } from "mongoose";

export type tUserClass = Document & {
    name : string,
    secondName : string,
    description : string,
    email : string,
    password : string,
    reg : string,
    photoProfile : string,
    savedBlogs : Types.ObjectId[]
}

export type tBlogClass = Document & {
    title : string,
    description : string,
    tags : string[]
    owner : Types.ObjectId,
    published : boolean,
    reg : string,
    updateAt : Date
}

export type tPostClass = Document & {
    title : string,
    blocks : iBlock[],
    tags : string[],
    blog : Types.ObjectId,
    author :Types.ObjectId
}