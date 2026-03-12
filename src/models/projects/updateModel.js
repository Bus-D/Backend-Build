import { db } from '../db.js';

const getAllUpdates = async () => {
    const query = `
        SELECT
            id,
            project_id AS "projectId",
            milestone_id AS "milestoneId",
            title,
            body,
            approval_status AS "approvalStatus"
        FROM updates
        ORDER BY title
    `;

    const result = await db.query(query);
    return result.rows;
}

const getUpdateById = async (id) => {
    const query = `
        SELECT
            id,
            title,
            body
        FROM updates
        WHERE updates.id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const createUpdate = async (title, body, requires_approval) => {
    const query = `
        INSERT INTO updates (title, body, requires_approval)
        VALUES (
            $1,
            $2,
            $3)
        RETURNING id, title, body, requires_approval, created_at, created_by
    `;

    const result = await db.query(query, [title, body, requires_approval])
    return result.rows[0] || null;
}

const approveUpdate = async (id, approval_status, approval_comment, approved_by) => {
    const query = `
        UPDATE updates
        SET
            approval_status = $1,
            approval_comment = $2,
            approved_at = CURRENT_TIMESTAMP,
            approved_by = $3
        WHERE id = $4
        RETURNING
            id,
            approval_status AS "approvalStatus",
            approval_comment AS "approvalComment",
            approved_at AS "approvedAt",
            approved_by AS "approvedBy"
    `;

    const result = await db.query(query, [approval_status, approval_comment, approved_by, id]);
    return result.rows[0] || null;
}

const removeUpdate = async (id) => {
    const query = `
        DELETE FROM updates
        WHERE
            id = $1
        RETURNING
            id
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const getPendingApprovalsForUser = async (userId) => {
    const query = `
        SELECT 
            updates.id,
            updates.project_id AS "projectId",
            updates.title,
            updates.approval_status AS "approvalStatus"
        FROM updates
        INNER JOIN project_users
            ON updates.project_id = project_users.project_id
        WHERE
            project_users.user_id = $1
            AND project_users.permission_level = 'approver'
            AND updates.require_approval = true
            AND updates.approval_status = 'pending'
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
}

const getApproved = async (userId) => {
    const query = `
        SELECT 
            updates.id,
            updates.project_id AS "projectId",
            updates.title,
            updates.approval_status AS "approvalStatus"
        FROM updates
        INNER JOIN project_users
            ON updates.project_id = project_users.project_id
        WHERE
            project_users.user_id = $1
            AND project_users.permission_level = 'approver'
            AND updates.require_approval = true
            AND updates.approval_status = 'approved'
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
}

const getRejected = async (userId) => {
    const query = `
        SELECT 
            updates.id,
            updates.project_id AS "projectId",
            updates.title,
            updates.approval_status AS "approvalStatus"
        FROM updates
        INNER JOIN project_users
            ON updates.project_id = project_users.project_id
        WHERE
            project_users.user_id = $1
            AND project_users.permission_level = 'approver'
            AND updates.require_approval = true
            AND updates.approval_status = 'rejected'
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
}

export {
    getAllUpdates,
    getUpdateById,
    createUpdate,
    approveUpdate,
    removeUpdate,
    getPendingApprovalsForUser,
    getApproved,
    getRejected
};
