import { db } from '../db.js'

const getAllProjects = async () => {
    const query = `
        SELECT
            id,
            name,
            description,
            progress_percentage,
            status
        FROM projects
        ORDER BY name
    `;

    const result = await db.query(query);
    return result.rows;
}

const getProjectById = async (id) => {
    const query = `
        SELECT
            id,
            name,
            description,
            status,
            progress_percentage as "progressPercentage",
            deadline,
            created_at
        FROM projects
        WHERE projects.id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const getUsersByProject = async (projectId) => {
    const query = `
        SELECT 
            users.id,
            users.name,
            users.role,
            project_users.project_id AS "projectId",
            project_users.permission_level AS "permissions"
        FROM users
        INNER JOIN project_users 
            ON users.id = project_users.user_id
        WHERE project_users.project_id = $1
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
}

const getProjectsByUser = async (userId) => {
    const query = `
        SELECT
            projects.id,
            projects.name,
            projects.status,
            project_users.permission_level AS "permissions"
        FROM projects
        INNER JOIN project_users
            ON projects.id = project_users.project_id
        WHERE project_users.user_id = $1
        `;

        const result = await db.query(query, [userId]);
        return result.rows;
}

const createProject = async (name, description, deadline) => {
    const query = `
        INSERT INTO projects (name, description, deadline)
        VALUES (
            $1,
            $2,
            $3)
        RETURNING id, name, description, progress_percentage, deadline, created_at
    `
    
    const result = await db.query(query, [name, description, deadline]);
    return result.rows[0] || null;
}

const updateProjectProgress = async (id, progress) => {
    const query = `
        UPDATE projects
        SET
            progress_percentage = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING 
            id,
            progress_percentage AS "progressPercentage", 
            updated_at
    `;

    const result = await db.query(query, [progress, id]);
    return result.rows[0] || null;
}

const archiveProject = async (id) => {
    const query = `
        UPDATE projects
            SET status = 'archived'
        WHERE id = $1
        RETURNING 
            id,
            status
    `;

    const results = await db.query(query, [id]);
    return results.rows[0] || null;
}

const assignUserToProject = async (projectId, userId, permissionLevel = "approver") => {
    const query = `
        INSERT INTO project_users (
            project_id, 
            user_id, 
            permission_level)
        VALUES (
            $1,
            $2,
            $3)
        ON CONFLICT (project_id, user_id)
        DO UPDATE SET permission_level = EXCLUDED.permission_level
        RETURNING 
            id, 
            project_id AS "projectId", 
            user_id AS "userId", 
            permission_level AS "permissinLevel"
    `;

    const result = await db.query(query, [projectId, userId, permissionLevel]);
    return result.rows[0] || null;
}

const removeUserFromProject = async (projectId, userId) => {
    const query = `
        DELETE FROM project_users
        WHERE
            project_id = $1,
            AND user_id = $2
        RETURNING 
            project_id AS "projectId",
            user_id AS "userId"
    `;

    const result = await db.query(query, [projectId, userId]);
    return result.rows[0] || null;
}

export {
    getAllProjects,
    getProjectById,
    getUsersByProject,
    getProjectsByUser,
    createProject,
    updateProjectProgress,
    archiveProject,
    assignUserToProject,
    removeUserFromProject
};