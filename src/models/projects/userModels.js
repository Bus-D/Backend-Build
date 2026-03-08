import db from '../db.js';


/**
 * Check is email is already registered
 * 
 * @param {string} email - The email we are checking
 * @returns {Promise<boolean>} True if email exists, flase otherwise
 */
const emailExists = async (email) => {
    const query = `
        SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists
        `;

        const result = await db.query(query, [email]);
        return result.rows[0].exists;
}

/**
 * Save user to the database
 * 
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} hashedPassword - Bcrypt hashed password
 * @return {Promise<Object>} New User profile, no password
 */
const saveUser = async (name, email, hashedPassword) => {
    const query = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES (
            $1,
            $2,
            $3,
            ('client'))
        RETURNING id, name, email, role, created_at
    `;

    const result = await db.query(query, [name, email, hashedPassword]);
    return result.rows[0];
}

/**
 * Retrieve a sinlge user
 */
const getUserById = async (id) => {
    const query = `
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM users
        WHERE users.id = $1
    `;

    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

const getUserByEmail = async (email) => {
    const query = `
        SELECT 
            id,
            name,
            email,
            role,
            password_hash
        FROM users
        WHERE email = $1
    `;

    const result = await db.query(query, [email]);
    return result.rows[0] || null;
};

const updateUser = async (id, name, email) => {
    const query = `
        UPDATE users
        SET
            name = $1,
            email = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING id, name, email, updated_at
    `;

    const result = await db.query(query, [name, email, id]);
    return result.rows[0] || null;
}

const deleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rowCount > 0;
}

/**
 * Return all registered users
 * 
 * @returns {Promise<Array>} Array of user records without passwords
 */

const getAllUsers = async () => {
    const query = `
        SELECT id, name, email, created_at
        FROM users
        ORDER BY name
        `;

    const result = await db.query(query);
    return result.rows;
}

export {
    emailExists,
    saveUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers
};