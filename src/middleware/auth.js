/**
 * Authentication Middleware
 */

const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
        next();
    } else {
        res.redirect('/login');
    }
}

/**
 * Require certain roles
 * Returns middleware to check if user has the required roles
 * 
 * @param {string} roleName - The role required 'admin', 'client'
 * @returns {Function} Express middleware function
 */
const requireRole = (roleName) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to see this page');
            return res.redirect('/login');
        }

        if (req.session.user.role !== roleName) {
            req.flash('error', 'You do not have the required permissions to see this page or preform this action');
            return res.redirect('/');
        }

        if (req.session.user.role === 'admin') {
            res.locals.isAdmin = true;
        }

        next();
    }
}

export { requireLogin, requireRole };
