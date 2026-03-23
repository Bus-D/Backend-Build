import { getAllUsers } from '../../models/projects/userModels.js';
import { getAllProjects, getProjectsByUser } from '../../models/projects/projectModels.js';

export const showDashboard = async (req, res) => {
try {
        const user = req.session.user;
        const sessionData = req.session;

        if (!req.session.user) {
            req.flash('error', 'You must log in first');
            return res.redirect('/login');
        }

        // Check for password in session data
        if (user && user.password) {
            console.error('Security Error: Password found in user object');
            delete user.password;
        }
        if (sessionData.user && sessionData.user.password) {
            console.error('Security Error: password found in session object');
            delete sessionData.user.password;
        }

        const project = user.role === 'admin'
            ? await getAllProjects()
            : await getProjectsByUser(user.id);

        const projectPreview = project.slice(0, 3);

        let clientPreview = [];

        if (user.role === 'admin') {
            const clients = await getAllUsers();
            clientPreview = clients.slice(0, 3);
        }

        // show pending approvals later

        const view = user.role === 'admin'
            ? 'admin/dashboard'
            : 'client/dashboard';

            res.render(view, {
                title: `${user.name} Dashboard`,
                user: user,
                projects: projectPreview,
                clients: clientPreview
            });
    } catch(error) {
        console.error('Error showing dashboard:', error);
        res.status(500);
    }
};



