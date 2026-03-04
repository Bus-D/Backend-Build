import { Router } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import {
    emailExists,
    saveUser,
    getAllUsers,
    getUserById,
    getUsersByProject,
    getProjectsByUser,
    updateUser,
    deleteUser
} from '../../models/forms/registration.js';
// import { requireLogin} from '../../middlware/auth.js';
// import { registrationValidation, editValidation } from '../../models/validation/forms.js';

const router = Router();

/**
 * Display Registration Form
 */
const showRegistrationForm = (req, res) => {
    res.render('forms/register/form', {
        title: 'Client Account Resgistration'
    });
};

const showEditAccountForm = async (req, res) => {
    const targetUserId = parseInt(req.params.id);
    const currentUser = req.session.user;

    const targetUser = await getUserByid(targetUserId);

    if (!targetUser) {
        req.flash('error', 'User not found');
        return res.redirect('/profile/edit');
    }

    // Check permissions
    // users can edit themselves
    // admins can edit anyone
    const canEdit = currentUser.id === targetUserId || currentUser.role === 'admin';

    if (!canEdit) {
        req.flash('error', 'You do not have permission to edit this account');
        return res.redirect('/register/login');
    }

    res.render('forms/register/edit', {
        title: 'Edit Account',
        user: targetUser
    });
}

/**
 * Process account edit submission
 */
const processEditAccount = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
    }

    const targetUserId = parseInt(req.params.id);
    const currentUser = req.session.user;

    const { name, email } = req.body;

    try {
        const targetUser = await getUserById(targetUserId);

        if (!targetUser) {
            req.flash('error', 'User not found');
            return res.redirect('/profile/edit');
        }

        canEdit = currentUser.id === targetUser || currentUser.role === 'admin';

        if (!canEdit) {
            req.flash('error', 'You do not have permission to edit this profile');
            return res.redirect('/register/login');
        }

        // Check is the new email they are switching to already exists
        const emailTaken = await emailExists(email);
        if (emailTaken && targetUser.email !== email) {
            req.flash('error', 'This email already exists');
            return res.redirect(`/profile/${targetUserId}/edit`);
        }

        await updateUser(targetUserId, name, email);

        if (currentUser.id === targetUserId) {
            req.session.user.name = name;
            req.session.user.email = email;
        }

        req.flash('success', 'Account updated successfully');
        res.redirect(`/profile/${targetUserId}`);
    } catch (error) {
        console.error('Error updating account:', error);
        req.flash('error', 'An error occurred while updating the account');
        res.redirect(`/profile/${targetUserId}/edit`);
    }
};

/**
 * Handle user registration with password hashing
 */
const processRegistration = async (req, res) => {
    // Validation error check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error('Registration Errors:', errors.array());
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('/register');
    }

    const { name, email, password } = req.body;

    try {
        const emailTaken = await emailExists(email);

        if (emailTaken) {
            req.flash('error', `${email} already exists. Please use a different email`);

            return res.redirect('/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await saveUser(name, email, hashedPassword);

        req.flash('success', 'Registration Successful');
        res.redirect('/forms/login');
    } catch (error) {
        console.error('Error saving user:', error);
        req.flash('error', 'Error creating user account, please try again');
        res.redirect('/register');
    }
};

/**
 * Process account deletion
 */
const processDeleteAccount = async (req, res) => {
    const targetUserId = parseInt(req.params.id);
    const targetUser = await getUserById(targetUserId);
    const currentUser = req.session.user

    if (!currentUser.role !== 'admin') {
        console.log('Unauthorized Delete Attempt:' `${currentUser} attempted to delete ${targetUser} account`);
        req.flash('error', 'You do not have permission to delete users');
        return res.redirect('/forms/login');
    }

    if (currentUser.role === admin && currentUser.id === targetUserId) {
        req.flash('error', 'You cannot delete yourself');
        return res.redirect('/admin/dashboard/allAccounts');
    }

    try {
        const deleted = await deleteUser(targetUserId);

        if (deleted) {
            req.flash('success', 'Account successfully deteled');
        } else {
            req.flash('error', 'User not found or user already deleted');
        }
    } catch(error) {
        console.error('Error Deleting User', error);
        req.flash('error', 'An error occured while deleting the account');
    }

    res.redirect('/admin/dashboard/allAccounts');
}

const showAllUsers = async (req, res) => {
    // Initialize empty user array
    let users = [];

    try {
        users = await getAllUsers();
    } catch (error) {
        req.flash('error', 'Error retrieving user list');
        console.error('Error retrieving user list:', error);
    }

    res.render('admin/dashboard/allAccounts', {
        title: 'All Registered Accounts',
        users,
        user: req.session && req.session.user ? req.session.user : null
    })
};


// Registration form/processing
router.get('/', showRegistrationForm);
router.post('/', processRegistration);

// All users
router.get('/admin/dashboard/allUsers', requireLogin, requireRole('admin'), showAllUsers);

// Edit account
router.get('/profile/:id/edit', requireLogin, showEditAccountForm);
router.post('/profile/:id/edit', requireLogin, processEditAccount);

// Delete account
router.post('/profile/:id/delete', requireLogin, requireRole('admin'), processDeleteAccount);

export default router;