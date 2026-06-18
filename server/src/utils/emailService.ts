import { Resend } from "resend";

// Asegurámonos de que a API KEY exista para que non pete
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvitationEmail = async (email: string, teamName: string, token: string) => {
    try {
        const url = `${`http://localhost:5173`}/team/team-invitation/${token}`;

        const data = await resend.emails.send({
            from: "Blog App <infoinkly@gmail.com>", // Cambia isto polo teu dominio cando esteas en produción (ex: no-reply@tudominio.com)
            to: email,
            subject: `Invitación para unirte ao equipo: ${teamName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Te invitarón a unirte al equipo <strong>${teamName}</strong></h2>
                    <p>Haz click en el siguiente botón para aceptar la invitación y unirte al blog:</p>
                    <a
                        href="${url}"
                        style="
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #0d6efd;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 15px;
                            font-weight: bold;
                        "
                    >
                        Unirme al equipo
                    </a>
                </div>
            `
        });
        
        return data;
    } catch (error) {
        console.error("Erro ao enviar o email de invitación:", error);
        throw new Error("Non se puido enviar o email de invitación");
    }
};