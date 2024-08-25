import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { getAllPosts, getAPost, addAPost, updateAPost, deleteAPost, getMyPosts } from '../controller/blog.js';
import { checkToken } from '../middleware/question.js';

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

router.get('/posts', getAllPosts);
router.get('/posts/:id', getAPost);
router.get('/my-posts', checkToken, getMyPosts);
router.post('/posts', checkToken, upload.single('image'), [
  body('title').isString().isLength({ min: 1 }),
  body('description').isString()
], addAPost);

router.put('/posts/:id', checkToken, upload.single('image'), [
  body('title').optional().isString().isLength({ min: 1 }),
  body('description').optional().isString()
], updateAPost);

router.delete('/posts/:id', checkToken, deleteAPost);

export default router;
