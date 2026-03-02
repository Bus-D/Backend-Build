import { Router } from 'express';
import { homePage, aboutPage } from './index.js';

const router = Router();

// Static Pages
router.get('/', homePage);
router.get('/about', aboutPage);

export default router;