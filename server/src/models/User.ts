import mongoose, { Schema } from "mongoose";
import { tUserClass } from "../types";

export const UserSchema = new Schema ({
    name : {
        type : String,
        require : true,
    },
    secondName : {
        type : String
    },
    email : {
        type : String,
        require : true,
        trim : true
    },
    password : {
        type : String,
        require : true,
    },
    reg : {
        type : Number,
        require : true
    }
}, { timestamps : true });

const User = mongoose.model<tUserClass>('User', UserSchema);
export default User;