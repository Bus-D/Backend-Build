import { Router } from 'express';
import { homePage, aboutPage } from './index.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout, showDashboard } from './forms/login.js';
import { requireLogin, requireRole, requireAdmin } from '../middleware/auth.js';

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

// Registration Routes
router.use('/register', registrationRoutes);

// Login Routes
router.use('/login', loginRoutes);

//Authentication results
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, requireRole, showDashboard);

// Admin Routes
router.get('/admin', requireLogin, requireAdmin, adminRoutes);

export default router;