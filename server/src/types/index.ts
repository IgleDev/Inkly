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
    updateAt : Date,
    team : Types.ObjectId
}

export type tPostClass = Document & {
    title : string,
    blocks : iBlock[],
    tags : string[],
    blog : Types.ObjectId,
    author :Types.ObjectId
}

export interface tTeamClass extends Document {
    name : string;
    owner : Types.ObjectId;
    blog : Types.ObjectId;
}

export interface tTeamMembershipClass extends Document {
    user : Types.ObjectId;
    team : Types.ObjectId;
    role : "member" | "admin";
    joinedAt : Date;
}

export interface tTeamInvitationClass extends Document {
    team : Types.ObjectId;
    email : string;
    invitedBy : Types.ObjectId;
    token : string;
    status : "pending" | "accepted" | "declined" | "expired";
    expiresAt : Date;
}