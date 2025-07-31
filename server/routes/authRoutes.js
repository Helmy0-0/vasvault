import express from 'express';
import { register, login, getUsersId } from '../controllers/authController.js';
import authenticate from '../auth.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/users/:id', getUsersId, authenticate)

export default router;