import db from './db.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Set up db by running seed.sql if needed
 * Checks if faculty table has data. If not, runs a full reseed
 */
const setupDatabase = async () => {
    // Check if faculty table exists
    let hasData = false;

    try {
        const result = await db.query(
            "SELECT EXISTS (SELECT 1 FROM faculty LIMIT 1) as has_data"
        );
        hasData = result.rows[0]?.has_data || false;
    } catch (error) {
        // If query fails treat the same as no data
        hasData = false;
    }

    if (hasData) {
        console.log('Database already seeded');
        return true;
    }

    // No faculty - run full seed
    console.log('Seeding database...');
    const seedPath = join(__dirname, 'sql', 'seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');
    await db.query(seedSQL);

    const portfolioPath = join(__dirname, 'sql', 'portfolio.sql');
    if (fs.existsSync(portfolioPath)) {
        const portfolioSQL = fs.readFileSync(portfolioPath, 'utf8');
        await db.query(portfolioSQL);
        console.log('Portfolio database tables initialized')
    }
    console.log('Database seeded successfully');
    return true;
}

const testConnection = async () => {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('Database connection successful:', result.rows[0].current_time);
    return true;
}

export { setupDatabase, testConnection }