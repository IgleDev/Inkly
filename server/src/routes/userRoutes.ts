import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../middleware/validate";
import { body } from "express-validator";

const router = Router();

router.get('/test', (req, res) => {
    res.send('Test')
});

// * GET

// * POST

router.post('/',
    body('userName').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('secondName').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('email').isEmail().withMessage('El email no tiene un formato correcto').notEmpty().withMessage('No puede estar vacio').trim(),
    body('password').isLength({min : 8}).withMessage('Mínimo 8 caracteres').notEmpty().withMessage('No puede estar vacia').trim(),
    body('reg').isNumeric().withMessage('No puede ser una cadena de texto').notEmpty().withMessage('No puede estar vacio'),
    handleInputErrors,
    UserController.createUser
)

// * UDPATE

// * PATCH

// * DELETE

export default router;