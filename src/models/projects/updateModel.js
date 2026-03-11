import { db } from '../db.js';

const getAllUpdates = async () => {
    const query = `
        SELECT
            id,
            project_id,
            milestone_id,
            title,
            body,
            approval_status
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
            body,
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

const updateUpdate = async (id, approval_status, approval_comment, approved_by) => {
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
}