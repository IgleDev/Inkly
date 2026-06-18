import { Router } from "express";
import { param } from "express-validator";
import { authenticate } from "../middleware/authenticate";
import { handleInputErrors } from "../middleware/validate";
import { EmailController } from "../controllers/EmailController";

const router = Router();

router.post(
    "/:blogId/invite",
    authenticate,
    handleInputErrors,
    EmailController.inviteMember
);

router.post('/invitation/:token/accept',
    authenticate, // Asegúrase de que o usuario está rexistrado/logueado
    param('token').notEmpty().withMessage('O token é obrigatorio'),
    handleInputErrors,
    EmailController.acceptInvitation
);

export default router;