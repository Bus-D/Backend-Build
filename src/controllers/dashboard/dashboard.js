import { getAllUsers } from '../../models/projects/userModels.js';
import { getAllProjects, getProjectsByUser } from '../../models/projects/projectModels.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caseStudyDir = path.join(__dirname, '../../views/projects');

const toSlug = (value = '') => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export const showDashboard = async (req, res) => {
try {
        const user = req.session.user;
        const sessionData = req.session;

    res.addStyle('<link rel="stylesheet" href="/css/dashboard.css">', 20);
    res.addScript('<script type="module" src="/script/dashboard.js" defer></script>', 20);

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

        const projects = user.role === 'admin'
            ? await getAllProjects()
            : await getProjectsByUser(user.id);

        let clientPreview = [];

        if (user.role === 'admin') {
            const clients = await getAllUsers();
            clientPreview = clients.slice(0, 3);
        }

        const projectsWithCaseStudy = await Promise.all(
            projects.map(async (project) => {
                const slug = toSlug(project.name);
                let hasCaseStudy = false;

                try {
                    await fs.access(path.join(caseStudyDir, `${slug}.ejs`));
                    hasCaseStudy = true;
                } catch {
                    hasCaseStudy = false;
                }

                return {
                    ...project,
                    caseStudySlug: slug,
                    hasCaseStudy
                };
            })
        );

        const dashboardOverview = {
            totalProjects: projectsWithCaseStudy.length,
            activeProjects: projectsWithCaseStudy.filter((project) => project.status === 'active').length,
            archivedProjects: projectsWithCaseStudy.filter((project) => project.status === 'archived').length,
            avgProgress: projectsWithCaseStudy.length === 0
                ? 0
                : Math.round(
                    projectsWithCaseStudy.reduce((acc, project) => {
                        const value = Number(project.progress) || 0;
                        return acc + value;
                    }, 0) / projectsWithCaseStudy.length
                )
        };

        // show pending approvals later

        const view = user.role === 'admin'
            ? 'admin/dashboard'
            : 'client/dashboard';

            res.render(view, {
                title: `${user.name} Dashboard`,
                user: user,
                projects: projectsWithCaseStudy,
                clients: clientPreview,
                overview: dashboardOverview
            });
    } catch(error) {
        console.error('Error showing dashboard:', error);
        res.status(500);
    }
};



