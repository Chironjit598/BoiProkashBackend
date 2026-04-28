import { Router } from 'express';
import {
  getBooks,
  getBookById,
  getHomeData,
  getCategories,
} from '../controllers/bookController.js';

const router = Router();

router.get('/home', getHomeData);
router.get('/categories', getCategories);
router.get('/', getBooks);
router.get('/:id', getBookById);

export default router;
