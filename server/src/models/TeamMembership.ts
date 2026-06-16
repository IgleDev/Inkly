import mongoose, { Schema } from "mongoose";
import { tTeamMembershipClass } from "../types";

export const TeamMembershipSchema = new Schema ({
    user : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    team : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Team'
    },
    role : {
        type : String,
        enum : ['member', 'admin'],
        default : 'member'
    },
    joinedAt : {
        type : Date,
        default : Date.now
    }
});

// un usuario no puede tener dos filas de membership para el mismo equipo,
// pero puede tener tantas filas como equipos quiera
TeamMembershipSchema.index({ user: 1, team: 1 }, { unique: true });

const TeamMembership = mongoose.model<tTeamMembershipClass>('TeamMembership', TeamMembershipSchema);
export default TeamMembership;