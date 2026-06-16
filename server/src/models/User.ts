import mongoose, { Schema } from "mongoose";
import { tUserClass } from "../types";

export const UserSchema = new Schema ({
    name : {
        type : String,
        required : true,
    },
    secondName : {
        type : String
    },
    description : {
        type : String
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    reg : {
        type : String,
        required : true
    },
    photoProfile : {
        type : String,
        required : false
    },
    savedBlogs : [{
        type : Schema.Types.ObjectId,
        ref : 'Blog'
    }]
}, { timestamps : true });

const User = mongoose.model<tUserClass>('User', UserSchema);
export default User;