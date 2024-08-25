import express from 'express';
import { body } from 'express-validator';
import { getAllPosts, getAPost, addAPost, updateAPost, deleteAPost, getMyPosts } from '../controller/blog.js';
import { checkToken } from '../middleware/question.js';
import { fileUpload } from '../middleware/fileUpload.js';

const router = express.Router();


router.get('/posts', getAllPosts);
router.get('/posts/:id', getAPost);
router.get('/my-posts', checkToken, getMyPosts);
router.post('/posts', checkToken, fileUpload.single('image'), [
  body('title').isString().isLength({ min: 1 }),
  body('description').isString()
], addAPost);

router.put('/posts/:id', checkToken, fileUpload.single('image'), [
  body('title').optional().isString().isLength({ min: 1 }),
  body('description').optional().isString()
], updateAPost);

router.delete('/posts/:id', checkToken, deleteAPost);

export default router;
