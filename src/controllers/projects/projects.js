const adminShowProjects = async (req, res) => {
    try {
        const user = req.session.user;

        if (user.role !== 'admin') {
            req.flash('error', 'You need to be an admin');
            console.error(`Unathorized access request. ${user.name} requested access to an admin page`);
            res.redirect('/login');
        }

        const projects = await getAllProjects();

        const formattedProjects = projects.map(project => ({
            id: project.id,
            name: project.name,
            description: project.description,
            progress: project.progress,
            status: project.status,
            deadline: project.deadline
        }));

        res.render('/admin/dashboard', {
            projects: formattedProjects
        });
    } catch(error) {
        req.flash('error', 'Error displaying projects');
        console.error('Error displaying projects', error);
    }
}

const clientShowProjects = async (req, res) => {
    try {
        const user = req.session.user;

        if (user.role !== 'client') {
            req.flash('error', 'You do not have access');
            console.error(`Authorization error:\n${user.name} tried accessing client data`);
            res.redirect('/login');
        };

        const clientProject = await getProjectsByUsers(user.id);

        const formattedClientProjects = clientProject.map(project => ({
            id: project.id,
            name: project.name,
            status: project.status,
            permission: project.permission
        }));

        res.render('client/dashboard', {
            projects: formattedClientProjects
        })
    } catch(error) {
        req.flash('error', 'Error showing projects');
        console.log('Error showing client projects', error);
    }
}