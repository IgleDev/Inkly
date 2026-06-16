import mongoose, { Schema } from "mongoose";
import { tTeamClass } from "../types";

export const TeamSchema = new Schema ({
    name : {
        type : String,
        required : true,
    },
    owner : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
        unique: true
    }
}, { timestamps : true });

const Team = mongoose.model<tTeamClass>('Team', TeamSchema);
export default Team;