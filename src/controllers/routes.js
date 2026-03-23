import { Router } from 'express';
import { homePage, aboutPage } from './index.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout } from './forms/login.js';
import { requireLogin, requireRole } from '../middleware/auth.js';
import { showDashboard } from '../controllers/dashboard/dashboard.js';

const router = Router();

// Dynamic Loading
router.use('/', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/main.css">');
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

// Client Routes
router.get('/client/dashboard', requireLogin, requireRole('client'), showDashboard);

// Admin Routes
router.get('/admin', requireLogin, requireRole('admin'));
router.get('/admin/users', requireRole('admin'));
router.get('/admin/projects', requireRole('admin'));
router.get('/admin/settings', requireRole('admin'));

export default router;