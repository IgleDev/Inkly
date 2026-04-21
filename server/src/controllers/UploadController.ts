import multer from 'multer';
import type { Request, Response } from 'express';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });

export class UploadController {
  public static async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
      }
      const url = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
      res.json({ url });
    } catch (error) {
      res.status(500).json({ error: 'Error al subir la imagen' });
    }
  }
}