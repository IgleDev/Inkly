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
    description : {
        type : String
    },
    email : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
    },
    reg : {
        type : String,
        require : true
    }
}, { timestamps : true });

const User = mongoose.model<tUserClass>('User', UserSchema);
export default User;