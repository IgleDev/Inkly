import { Router } from "express";
import { body, param } from "express-validator";
import { authenticate } from "../middleware/authenticate";
import { handleInputErrors } from "../middleware/validate";
import { UserController } from "../controllers/UserController";

const router = Router();

// * TEST
router.get('/test', (req, res) => {
    res.send('Test')
});

// * GET
router.get('/user',
    authenticate,
    UserController.user
)

router.get('/user/profile/:name',
    UserController.getUserByName
);

router.get('/user/:id',
    UserController.getUserById
);

// * POST
router.post('/',
    body('name').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('secondName').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('email').isEmail().withMessage('El email no tiene un formato correcto').notEmpty().withMessage('No puede estar vacio').trim(),
    body('password').isLength({min : 8}).withMessage('Mínimo 8 caracteres').notEmpty().withMessage('No puede estar vacia').trim(),
    body('reg').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    handleInputErrors,
    UserController.createUser
)

router.post('/login',
    body('email').isEmail().withMessage('El email no tiene un formato correcto').notEmpty().withMessage('No puede estar vacio').trim(),
    body('password').isLength({min : 8}).withMessage('Mínimo 8 caracteres').notEmpty().withMessage('No puede estar vacia').trim(),
    handleInputErrors,
    UserController.loginUser
)

// * UDPATE
router.put('/edit-profile-account/:id',
    authenticate,
    param('id').isMongoId().withMessage('Campo no válido').notEmpty().withMessage('Falta campo obligatorio'),
    body('name').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('secondName').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('description').optional().isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('email').isEmail().withMessage('El email no tiene un formato correcto').notEmpty().withMessage('No puede estar vacio').trim(),
    body('reg').isString().withMessage('No puede ser un entero').notEmpty().withMessage('No puede estar vacio'),
    body('photoProfile').optional().isString().withMessage('No puede ser un entero'),
    handleInputErrors,
    UserController.updateUser
)

// * PATCH

// * DELETE

export default router;