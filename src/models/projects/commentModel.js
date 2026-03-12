import { db } from '../db.js';

const getAllComments = async () => {
    const query = `
        SELECT
            id,
            update_id AS "updateId",
            user_id AS "userId",
            body
        FROM comments
        ORDER BY update_id
    `;

    const result = await db.query(query);
    return result.rows;
}

const getCommentById = async (id) => {
    const query = `
        SELECT 
            id,
            update_id AS "updateId",
            user_id AS "userId",
            body
        FROM comments
        WHERE id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const getCommentsForUpdate = async (updateId) => {
    const query = `
        SELECT
            id,
            user_id AS "userId",
            body,
            created_at
        FROM comments
        WHERE update_id = $1
        ORDER BY created_at
    `;

    const result = await db.query(query, [updateId])
    return result.rows;
}

const createComment = async (updateId, userId, body) => {
    const query = `
        INSERT INTO comments (user_id, body)
        VALUES (
            $1,
            $2,
            $3)
        RETURNING
            id,
            update_id AS "updateId",
            user_id AS "userId",
            body,
            created_at
    `;

    const result = await db.query(query, [updateId, userId, body]);
    return result.rows[0] || null;
}

const deleteComment = async (id) => {
    const query = `
        DELETE FROM comments
        WHERE
            id = $1
        RETURNING
            id
    `;

    const result = await db.query(query, [id])
    return result.rows[0] || null;
}

export {
    getAllComments,
    getCommentById,
    createComment,
    deleteComment
}