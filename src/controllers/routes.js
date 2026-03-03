import { Router } from 'express';
import { homePage, aboutPage } from './index.js';

const router = Router();

// Dynamic Loading
router.use('/', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/styles.css">');
    next();
});

router.use('/', (req, res, next) => {
    res.addScript('<script type="module" src="script/main.js" defer></script>');
    next();
})

// Static Pages
router.get('/', homePage);
router.get('/about', aboutPage);

export default router;