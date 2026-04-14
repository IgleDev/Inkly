import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validate";
import { BlogController } from "../controllers/BlogController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// * TEST

router.get('/test', (req, res) => {
    res.send('Test')
});

// * GET

router.get('/', BlogController.getAllBlogs);

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

