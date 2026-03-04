import { validationResult } from 'express-validator';
import { findUserByEmail, verifyPassword } from '../../models/forms/login.js';
import { Router } from 'express';

const router = Router();

const showLoginForm = (req, res) => {
    res.render('forms/login/form', {
        title: 'Login'
    });
}

const processLogin = async (req, res) => {
    console.log('Login attempt:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        })
        return res.redirect('/forms/login/form');
    }

    

    const {email, password} = req.body;

    try {
        const foundUser = await findUserByEmail(email)

        if (!foundUser) {
            req.flash('error', 'An account with this email does not exist');
            return res.redirect('/login');
        }

        const verifiedPassword = await verifyPassword(password, foundUser.password);

        if (!verifiedPassword) {
            req.flash('error', 'Incorrect Password');
            return res.redirect('/login');
        }

        // SECURITY: remove password before storing
        delete foundUser.password;

        req.session.user = foundUser;

        if (req.session.user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        }

        return res.redirect('/client/dashboard');
    } catch(error) {
        console.error('Login error', error);
        req.flash('error', 'An error occured when logging in. Please try again');

        res.redirect('/login');
    }
}

/**
 * Logout
 */
const processLogout = (req, res) => {
    // Check for session
    if (!req.session) {
        // If no session, return to home
        return res.redirect('/');
    }

    req.session.destroy((error) => {
        if (error) {
            console.error('Error destroying session:', error);

            // Clear cookie to stop sending invalid session id
            res.clearCookie('connect.sid');

            return res.redirect('/');
        }

        res.clearCookie('connect.sid');
        res.redirect('/');
    })
}

const showDashboard = (req, res) => {
    const user = req.session.user;
    const sessionData = req.session;

    // Check for password in session data
    if (user && user.password) {
        console.error('Security Error: Password found in user object');
        delete user.password;
    }
    if (sessionData.user && sessionData.user.password) {
        console.error('Security Error: password found in session object');
        delete sessionData.user.password;
    }

    if (user.role === 'admin') {
        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            sessionData,
            user
        });
    }

    res.render('client/dashboard', {
        title: 'Client Dashboard',
        sessionData,
        user
    });
}

router.get('/', showLoginForm);
router.post('/', processLogin);

export default router;
export { processLogout, showDashboard };