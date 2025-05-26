import express from 'express';
import {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz
} from '../controllers/quizController.js';

import { auth, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getAllQuizzes);
router.get('/:id', auth, getQuizById);
router.post('/', auth, isAdmin, createQuiz);
router.put('/:id', auth, isAdmin, updateQuiz);
router.delete('/:id', auth, isAdmin, deleteQuiz);
router.post('/:id/submit', auth, submitQuiz);

export default router;
