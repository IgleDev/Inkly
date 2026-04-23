import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { UploadController, upload } from '../controllers/UploadController';

const router = Router();

router.post('/', 
    authenticate,
    upload.single('file'), 
    UploadController.uploadImage
);

export default router;