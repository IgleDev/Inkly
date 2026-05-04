import { Router } from "express";
import { body, param, query } from "express-validator";
import { authenticate } from "../middleware/authenticate";
import { handleInputErrors } from "../middleware/validate";
import { BlogController } from "../controllers/BlogController";
import { maxLengths } from "../utils";

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
    body('title').isString().withMessage('No puede ser un número').notEmpty().withMessage('No puede estar vacío').isLength({ max: maxLengths.BLOG_TITLE }).withMessage('El título del blog no puede exceder de los caracteres puestos'),
    body('description').optional().isString().withMessage('La descripción debe ser texto').isLength({ max: maxLengths.BLOG_DESCRIPTION }).withMessage('La descripción del bloque no puede exceder de los caracteres puestos'),
    body('post.blocks').isArray({ min : 1}).withMessage('Debes tener al menos un elemento añadido en el Blog'),
    body('post.blocks.*.type').isIn(['heading', 'paragraph', 'image', 'video', 'quote']).withMessage('Tipo de bloque no válido'),
    body('post.blocks.*.value').optional().notEmpty().withMessage('El valor del bloque no puede estar vacío'),
    body('post.blocks.*.order').isInt({ min: 0 }).withMessage('El orden del bloque debe ser un número entero positivo'),
    body('post.blocks.*.paragraph').optional().isLength({ max: maxLengths.BLOCK_PARAGRAPH }).withMessage('El párrafo no puede exceder de los caracteres puestos'),
    body('post.blocks.*.quote').optional().isLength({ max: maxLengths.BLOCK_QUOTE }).withMessage('La cita no puede exceder de los caracteres puestos'),
    body('post.blocks.*.imageDescription').optional().isLength({ max: maxLengths.BLOCK_IMAGE_DESCRIPTION }).withMessage('La descripción de la imagen no puede exceder de los caracteres puestos'),
    body('post.tags').optional().isArray({ max: 3 }).withMessage('Solo puedes añadir un máximo de 3 tags'),
    body('post.tags.*').isString().withMessage('Los tags deben ser texto').isLength({ max: maxLengths.BLOCK_TAG }).withMessage('Los tags no pueden exceder de los caracteres puestos'),
    handleInputErrors,
    BlogController.createBlog
)

// * UDPATE
router.put('/edit-blog-published/:id',
    authenticate,
    param('id').isMongoId().withMessage('El ID no es válido').notEmpty().withMessage('Falta el Id del blog'),
    body('published').isBoolean().withMessage('El campo published debe ser un booleano').notEmpty().withMessage('Falta el campo published'),
    BlogController.updateBlogPublished
);

// * PATCH

// * DELETE

router.delete('/delete/:id',
    authenticate,
    param('id').isMongoId().withMessage('Campo no válido').notEmpty().withMessage('Falta campo obligatorio'),
    query('deleteBlog').equals('true').withMessage('Parámetro no válido'),
    BlogController.deleteBlog
)

export default router;

