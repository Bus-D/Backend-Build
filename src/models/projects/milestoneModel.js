import { db } from '../db.js';

const getAllMilestones = async () => {
    const query =`
        SELECT
            id,
            project_id AS "projectId",
            title,
            description,
            order_index AS "orderIndex"
            completed,
            completed_at
        FROM milestones
        ORDER BY order_index
    `;

    const result = await db.query(query);
    return result.rows;
}

const getMilestoneById = async (id) => {
    const query = `
        SELECT
            id, 
            title,
            description,
            project_id AS "projectId"
        FROM milestones
        WHERE id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const createMilestone = async (title, description, order_index) => {
    const query = `
        INSERT INTO milestones (title, description, order_index)
        VALUES (
            $1,
            $2,
            $3)
        RETURNING
            id,
            title,
            description,
            order_index AS "orderIndex"
            completed,
            created_at
    `;

    const result = await db.query(query, [title, description, order_index]);
    return result.rows[0] || null;
}

const completeMilestone = async (id) => {
    const query = `
        UPDATE milestones
        SET
            completed = true
            completed_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING
            id,
            title,
            description,
            completed,
            completed_at
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const getCompletedMilestones = async (project_id) => {
    const query = `
        SELECT
            id,
            title,
            description,
            completed,
            completed_at
        FROM milestones
        WHERE
            project_id = $1
            AND completed = true
    `;

    const result = await db.query(query, [project_id]);
    return result.rows;
}


const deleteMilestone = async (id) => {
    const query = `
        DELETE FROM milestones
        WHERE 
            id = $1
        RETURNING 
            id
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

export {
    getAllMilestones,
    getMilestoneById,
    createMilestone,
    completeMilestone,
    getCompletedMilestones,
    deleteMilestone
};