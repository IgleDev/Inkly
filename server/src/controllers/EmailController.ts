import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import Team from "../models/Team";
import mongoose from "mongoose";
import TeamInvitation from "../models/TeamInvitation";
import { sendInvitationEmail } from "../utils/emailService";
import Blog from "../models/Blog";
import TeamMembership from "../models/TeamMembership";


export class EmailController {

    public static inviteMember = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const userId = req.user._id;
            const { blogId } = req.params;

           const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).json({
                    msg: "Blog no encontrado"
                });
            }

            const team = await Team.findById(blog.team);

            if (!team) {
                return res.status(404).json({
                    msg: "Equipo no encontrado"
                });
            }
    
            const token = uuid();
    
            await TeamInvitation.create({
                team: blog.team,
                email,
                invitedBy: userId,
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });
    
            await sendInvitationEmail(email, team.name, token);
    
            return res.json({ msg: "Invitación enviada"});
        } catch (err: any) {
            console.error(err);

            return res.status(500).json({
                msg: err.message,
                stack: err.stack
            });
        }
    };

    public static async acceptInvitation(req: Request, res: Response) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { token } = req.params; // O token que ven na URL
            const user = req.user;        // O usuario que está logueado agora mesmo

            if (!user) {
                return res.status(401).json({ error: "Tes que iniciar sesión para aceptar a invitación" });
            }

            // 1. Buscamos a invitación polo token
            const invitation = await TeamInvitation.findOne({ token }).session(session);

            if (!invitation) {
                return res.status(404).json({ error: "A invitación non existe" });
            }

            // 2. Comprobamos se a invitación aínda é válida (estado e data)
            if (invitation.status !== 'pending') {
                return res.status(400).json({ error: `Esta invitación xa está ${invitation.status}` });
            }

            if (new Date() > invitation.expiresAt) {
                // Se caducou, actualizamos o estado e cortamos
                invitation.status = 'expired';
                await invitation.save({ session });
                await session.commitTransaction();
                return res.status(400).json({ error: "A invitación caducou" });
            }

            // 3. SEGURIDADE: Comprobar que o email do usuario logueado coincida co da invitación
            // (Asumindo que o teu req.user ten a propiedade email)
            if (user.email !== invitation.email) {
                if (!req.user?.email || req.user.email.toLowerCase() !== invitation.email.toLowerCase()) {
                    return res.status(403).json({ error: "Esta invitación foi enviada a outro enderezo de correo" });
                }
            }

            // 4. Comprobar que o usuario non sexa xa membro (evitamos o erro do teu índice único)
            const existingMembership = await TeamMembership.findOne({
                user: user._id,
                team: invitation.team
            }).session(session);

            if (existingMembership) {
                return res.status(400).json({ error: "Xa es membro deste equipo" });
            }

            // 5. Crear a nova fila en TeamMembership
            const newMembership = new TeamMembership({
                user: user._id,
                team: invitation.team,
                role: 'member' // Rolo por defecto segundo o teu Schema
            });
            await newMembership.save({ session });

            // 6. Marcar a invitación como aceptada
            invitation.status = 'accepted';
            await invitation.save({ session });

            // Todo listo, confirmamos os cambios na base de datos
            await session.commitTransaction();

            return res.status(200).json({ message: "Benvido ao equipo! Unícheste correctamente." });

        } catch (error: any) {
            await session.abortTransaction();
            console.error("Erro ao aceptar a invitación:", error);
            return res.status(500).json({ error: "Erro interno ao procesar a invitación" });
        } finally {
            session.endSession();
        }
    }
}