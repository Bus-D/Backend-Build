import { validationResult } from 'express-validator';
import { findUserByEmail, verifyPassword } from '../../models/authentication/login.js';
import { Router } from 'express';

const router = Router();

const showLoginForm = (req, res) => {
    res.render('forms/login', {
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
        return res.redirect('/login');
    }

    

    const {email, password} = req.body;

    try {
        const foundUser = await findUserByEmail(email)

        if (!foundUser) {
            req.flash('error', 'An account with this email does not exist');
            return res.redirect('/login');
        }

        const verifiedPassword = await verifyPassword(password, foundUser.password_hash);

        if (!verifiedPassword) {
            req.flash('error', 'Incorrect Password');
            return res.redirect('/login');
        }

        // SECURITY: remove password before storing
        delete foundUser.password_hash;

        req.session.user = foundUser;

        console.log('Login attempt:', req.body);

        return res.redirect(`/${foundUser.role}/dashboard`);

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

router.get('/', showLoginForm);
router.post('/', processLogin);


export default router;
export { showLoginForm, processLogin, processLogout };