import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProject as createProjectRecord, getProjectById, getUsersByProject, assignUserToProject } from '../../models/projects/projectModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsRoot = path.join(__dirname, '../../views/projects');

const toSlug = (value = '') => {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
};

const escapeForTemplate = (value = '') => {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
};

const paragraphize = (value = '') => {
	const safeText = escapeForTemplate(value);
	return safeText
		.split(/\r?\n\r?\n/)
		.map((block) => block.trim())
		.filter(Boolean)
		.map((paragraph) => `        <p>${paragraph.replace(/\r?\n/g, '<br>')}</p>`)
		.join('\n');
};

const buildCaseStudyTemplate = ({ title, projectName, summary, content }) => {
	const safeTitle = escapeForTemplate(title || `${projectName} Case Study`);
	const safeProjectName = escapeForTemplate(projectName);
	const safeSummary = escapeForTemplate(summary);
	const contentBlocks = paragraphize(content);

	return `<%- include('../partials/header') %>

<main class="section-container">
	<section class="hero">
		<h1>${safeTitle}</h1>
		<p class="muted">Project Case Study</p>
	</section>

	<section class="home-intro">
		<h2>${safeProjectName}</h2>
		<p>${safeSummary}</p>
	</section>

	<section class="home-intro">
		<h2>Project Story</h2>
${contentBlocks || '        <p>Case study details coming soon.</p>'}
	</section>
</main>

<%- include('../partials/footer') %>
`;
};

const showProjectDetails = async (req, res) => {
	try {
		const projectId = Number.parseInt(req.params.id, 10);
		if (Number.isNaN(projectId)) {
			req.flash('error', 'Invalid project id');
			return res.redirect('/');
		}

		const project = await getProjectById(projectId);
		if (!project) {
			req.flash('error', 'Project not found');
			return res.redirect('/');
		}

		const users = await getUsersByProject(projectId);
		const caseStudySlug = toSlug(project.name);

		let hasCaseStudy = false;
		try {
			await fs.access(path.join(viewsRoot, `${caseStudySlug}.ejs`));
			hasCaseStudy = true;
		} catch {
			hasCaseStudy = false;
		}

		return res.render('projects/project-details', {
			title: `${project.name} Project`,
			project,
			users,
			hasCaseStudy,
			caseStudySlug
		});
	} catch (error) {
		console.error('Error showing project details:', error);
		req.flash('error', 'Unable to load project details right now.');
		return res.redirect('/');
	}
};

const showCaseStudy = async (req, res, next) => {
	const slug = toSlug(req.params.slug || '');

	if (!slug) {
		req.flash('error', 'Invalid case study identifier');
		return res.redirect('/');
	}

	try {
		await fs.access(path.join(viewsRoot, `${slug}.ejs`));
		return res.render(`projects/${slug}`, {
			title: `${slug} Case Study`
		});
	} catch (error) {
		return next();
	}
};

const createProject = async (req, res) => {
	try {
		const user = req.session?.user;
		if (!user || user.role !== 'admin') {
			req.flash('error', 'Only admins can create projects.');
			return res.redirect('/login');
		}

		const {
			name,
			description,
			deadline,
			clientId
		} = req.body;

		if (!name || !name.trim()) {
			req.flash('error', 'Project name is required.');
			return res.redirect('/admin/dashboard');
		}

		const project = await createProjectRecord(name.trim(), description?.trim() || '', deadline || null);

		const parsedClientId = Number.parseInt(clientId, 10);
		if (!Number.isNaN(parsedClientId)) {
			await assignUserToProject(project.id, parsedClientId, 'approver');
		}

		req.flash('success', 'Project created successfully.');
		return res.redirect('/admin/dashboard');
	} catch (error) {
		console.error('Error creating project:', error);
		req.flash('error', 'Unable to create project right now.');
		return res.redirect('/admin/dashboard');
	}
};

const createCaseStudyPage = async (req, res) => {
	try {
		const user = req.session?.user;
		if (!user || user.role !== 'admin') {
			req.flash('error', 'Only admins can create case studies.');
			return res.redirect('/login');
		}

		const {
			projectId,
			projectName,
			caseStudyTitle,
			caseStudySummary,
			caseStudyContent,
			caseStudySlug
		} = req.body;

		let resolvedProjectName = projectName?.trim() || '';
		const parsedProjectId = Number.parseInt(projectId, 10);

		if (!Number.isNaN(parsedProjectId)) {
			const existingProject = await getProjectById(parsedProjectId);
			if (!existingProject) {
				req.flash('error', 'Selected project was not found.');
				return res.redirect('/admin/dashboard');
			}
			resolvedProjectName = existingProject.name;
		}

		if (!resolvedProjectName) {
			req.flash('error', 'Project name is required to create a case study.');
			return res.redirect('/admin/dashboard');
		}

		const generatedSlug = toSlug(caseStudySlug || resolvedProjectName);
		if (!generatedSlug) {
			req.flash('error', 'Case study slug could not be generated.');
			return res.redirect('/admin/dashboard');
		}

		const filePath = path.join(viewsRoot, `${generatedSlug}.ejs`);
		const content = buildCaseStudyTemplate({
			title: caseStudyTitle,
			projectName: resolvedProjectName,
			summary: caseStudySummary || 'A new project case study.',
			content: caseStudyContent || ''
		});

		await fs.writeFile(filePath, content, { flag: 'wx' });
		req.flash('success', `Case study page created at /projects/case-study/${generatedSlug}`);
		return res.redirect('/admin/dashboard');
	} catch (error) {
		if (error.code === 'EEXIST') {
			req.flash('error', 'Case study slug already exists. Choose a unique slug.');
			return res.redirect('/admin/dashboard');
		}

		console.error('Error creating case study page:', error);
		req.flash('error', 'Unable to create case study right now.');
		return res.redirect('/admin/dashboard');
	}
};

export {
	showProjectDetails,
	showCaseStudy,
	createProject,
	createCaseStudyPage
};
