import { Router } from 'express';
import { validationResult } from 'express-validator';
import { createContactForm, getAllContactForms } from '';
import { contactValidation } from '';

const router = Router();

// Show contact form
const showContactForm = (req, res) => {
    res.render('forms/contact', {
        title: 'Contact Bus-D Designs'
    });
};

/**
 * Handle Contact Form Submission w/Validation
 * If validation passes, save to database then redirect
 * If validation failes, log errors and redirect back to form
 */
const handleContactSubmission = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Store as flash errors
        errors.array().forEach(error => {
            req.flash('error', error,msg);
        });

        return res.redirect('/contact');
    }

    // Extract validataed data
    const {subject, message } = req.body;

    try {
        // Save to database
        await createContactForm(subject, message);
        req.flash('success', 'Thank you for contacting us! We will respond soon');
        res.redirect('/contact');
    } catch(error) {
        console.log('Error saving contact form:', error);
        req.flash('error', 'Unable to submit your message. Please try again');
        res.redirect('/contact');
    }
};

/**
 * Display all contact form submissions
 */

const showContactResponses = async (req, res) => {
    let contactForms = [];

    try {
        contactForms = await getAllContactForms();
    } catch(error) {
        console.error('Error retrieving contact forms:', error);
    }

    res.render('frorms/contact/responses', {
        title: 'Contact Form Submissions',
        contactForms
    });
}

router.get('/', showContactForm);
router.post('/',
    contactValidation,
    handleContactSubmission
);

router.get('/responses', showContactResponses);

export default router;