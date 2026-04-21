import { Router } from 'express';
import { UploadController, upload } from '../controllers/UploadController';

const router = Router();

router.post('/', 
    upload.single('file'), 
    UploadController.uploadImage
);

export default router;