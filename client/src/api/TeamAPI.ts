import api from "@/lib";
import { getToken, axiosError } from "@/helper";
import type { iInviteTeamParams } from "@/types/helperTypes";

export async function inviteTeam({ email, blogId } : iInviteTeamParams) {
    try {
        const url = `/team/${blogId}/invite`;
        const { data } = await api.post(url, { email }, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        if(!data) {
            throw new Error('Non se puido aceptar a invitación');
        }

        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function acceptTeamInvitation(token : string) {
    try {
        const url = `/team/invitation/${token}/accept`;
        const { data } = await api.post(url, {}, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        if(!data) {
            throw new Error('Non se puido aceptar a invitación');
        }
        return data;
    } catch (error) {
        axiosError(error);
    }
}