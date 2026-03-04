/**
 * Flash Message Middleware
 * 
 * Provides temporary message storage that survives redirects but is consumed on render.
 * Messages are stored in the session and organized by type (success, error, warning, info).
 * 
 * Usage in controllers:
 *   req.flash('success', 'Message text')  // Store a message
 *   req.flash('error')                    // Get all error messages
 *   req.flash()                           // Get all messages (all types)
 */

const flashMiddleware = (req, res, next) => {
    // Track if flash messages have been stored
    let sessionNeedsSaved = false;

    // Override res.redirect to force a session save
    const originalRedirect = res.redirect.bind(res);
    res.redirect = (...args) => {
        if (sessionNeedsSaved && req.session) {
            req.session.save(() => {
                originalRedirect.apply(res, args);
            })
        } else {
            originalRedirect.apply(res, args);
        }
    }

    /**
    * The flash function handles both setting and getting messages
    * - Called with 2 args (type, message): stores a new message
    * - Called with 1 arg (type): retrieves and clears messages of that type
    * - Called with 0 args: retrieves and clears all messages
    */
    req.flash = function(type, message) {
        // GUARD: if session !exist (after session.destroy)
        // return early to prevent errors
        if (!req.session) {
            if (type && message) {
                return;
            }
            return { success: [], error: [], warning: [], info: [] };
        }

        if (!req.session.flash) {
            req.session.flash = {
                success: [],
                error: [],
                warning: [],
                info: []
            };
        }

        // SETTING: two args store a message
        if (type && message) {
            // Ensyre type exists
            if (!req.session.flash[type]) {
                req.session.flash[type] = [];
            }
            // Add message to type
            req.session.flash[type].push(message);
            // Set session needs to be saved
            sessionNeedsSaved = true;
            return;
        }

        // GETTIG ONE TYPE: if no message, retrieve all of the type to display
        if (type && !message) {
            const messages = req.session.flash[type] || [];
            // Clear type after retrieving messages
            req.session.flash[type] = [];
            return messages;
        }
    }

    const allMessages = req.session.flash || {
        success: [],
        error: [],
        warning: [],
        info: []
    }
}