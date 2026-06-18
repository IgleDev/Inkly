import mongoose, { Schema } from "mongoose";
import { tTeamInvitationClass } from "../types";

export const TeamInvitationSchema = new Schema ({
    team : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Team'
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    invitedBy : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    token : {
        type : String,
        required : true,
        unique : true
    },
    status : {
        type : String,
        enum : ['pending', 'accepted', 'declined', 'expired'],
        default : 'pending'
    },
    expiresAt : {
        type : Date,
        required : true
    }
}, { timestamps : true });

const TeamInvitation = mongoose.model<tTeamInvitationClass>('TeamInvitation', TeamInvitationSchema);
export default TeamInvitation;