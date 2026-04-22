import { iBlock } from "./helperModel";
import { Document, Types } from "mongoose";

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
    owner : Types.ObjectId,
    published : boolean,
    reg : string,
}

export type tPostClass = Document & {
    title : string,
    blocks : iBlock[],
    tags : string[],
    blog : Types.ObjectId,
    author :Types.ObjectId
}