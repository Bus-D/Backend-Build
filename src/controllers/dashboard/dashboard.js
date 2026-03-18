import { getAllUsers } from '../../models/projects/userModels.js';
import { getAllProjects, getProjectsByUser } from '../../models/projects/projectModel.js';

export const showDashboard = async (req, res) => {
try {
        const user = req.session.user;

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
                projects: projectPreview,
                clients: clientPreview
            });
    } catch(error) {
        console.error('Error showing dashboard:', error);
        res.status(500);
    }
};



