//imports 

const adminShowClientsOnProject = async (req, res) => {
    try {
        const user = req.session.user;

        if (user.role !== 'admin') {
            req.flash('error', 'You need to be an admin to see this data');
            console.error(`Unathorized access request. ${user.name} requested access to an admin page`);
            res.redirect('/login');
        }

        const clientsOnProject = await getUsersByProject();

        const formattedClientsOnProjects = clientsOnProject.map(client => ({
                id: client.id,
                name: client.name,
                role: client.role,
                onProject: client.projectId,
                permissions: client.permissions
        }));

        res.render('admin/dashboard', {
            clientsOnProjects: formattedClientsOnProjects
        });
    } catch(error) {
        req.flash('error', 'Error displaying clients on projects');
        console.error('Error displaying clients on projects:', error);
    }
}