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
        return res.redirect('/register/list');
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