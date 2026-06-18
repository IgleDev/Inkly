import api from "@/lib";
import { getToken, axiosError } from "@/helper";

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