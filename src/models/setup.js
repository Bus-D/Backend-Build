import db from './db.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupDatabase = async () => {
    try {
        // Check if "users" table exists
        const result = await db.query(`
            SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = 'users'
            ) AS exists;
        `);

        const exists = result.rows[0].exists;

        if (exists) {
            console.log('Database already initialized');
            return true;
        }

        console.log('Initializing database...');

        const schemaPath = join(__dirname, 'sql', 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
        await db.query(schemaSQL);

        const seedPath = join(__dirname, 'sql', 'seed.sql');
        if (fs.existsSync(seedPath)) {
            const seedSQL = fs.readFileSync(seedPath, 'utf8');
            await db.query(seedSQL);
            console.log('Seed data inserted');
        }

        console.log('Database setup complete');
        return true;
    } catch (error) {
        console.error('Databse setup failed:', error);
    }
};

const testConnection = async () => {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('Database connection successful:', result.rows[0].current_time);
    return true;
};

export { setupDatabase, testConnection}