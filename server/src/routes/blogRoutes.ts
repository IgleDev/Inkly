import { Router } from "express";
import { body, param, query } from "express-validator";
import { authenticate } from "../middleware/authenticate";
import { handleInputErrors } from "../middleware/validate";
import { BlogController } from "../controllers/BlogController";

const router = Router();

// * TEST

router.get('/test', (req, res) => {
    res.send('Test')
});

// * GET

router.get('/',
    query('reg').notEmpty().withMessage('La región es obligatoria'),
    BlogController.getAllBlogs
);

router.get('/filter-by-tags',
    query('reg').notEmpty().withMessage('La región es obligatoria'),
    query('tag').isString().withMessage('El tag debe ser texto').notEmpty().withMessage('No puede estar vacio'),
    BlogController.getBlogByTags
);

router.get('/:id',
    param('id').isMongoId().withMessage('ID de blog no válido').notEmpty().withMessage('ID de blog es obligatorio'),
    BlogController.getBlogById
)

// * POST

router.post('/create',
    authenticate,
    body('title').isString().withMessage('No puede ser un número').notEmpty().withMessage('No puede estar vacío'),
    body('post.blocks').isArray({ min : 1}).withMessage('Debes tener al menos un elemento añadido en el Blog'),
    handleInputErrors,
    BlogController.createBlog
)

// * UDPATE

// * PATCH

// * DELETE

export default router;

