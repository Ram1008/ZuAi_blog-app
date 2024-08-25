import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUser } from '../controller/user.js';
import { checkToken } from '../middleware/question.js';

const router = express.Router();

router.post('/register', [
  body('name').isString().isLength({ min: 3, max: 50 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], registerUser);

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], loginUser);

router.get('/user', checkToken, getUser);

export default router;
