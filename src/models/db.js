import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const ENABLE_SQL_LOGGING = process.env.ENABLE_SQL_LOGGING?.toLowerCase() || 'true';

// Read the CA certificate content
const caCert = fs.readFileSync(path.join(__dirname, '../../bin', 'byuicse-psql-cert.pem'));

/**
 * Connectin pool for PostgreSQL db
 * 
 * Uses a connection string from env variables for similified setup
 * Connection string format is:
 * postgresql://username:pasword@host:port/database
 */
const pool = new Pool({ 
    connectionString: process.env.DB_URL,
    ssl: {
        ca: caCert, //Uses the certificate content, not file path
        rejectUnauthorized: true, // Keep true for proper security
        checkServerIdentity: () => { return undefined; } // SKip hostname verification, keeping cert chain validaiton
    }
});

/**
 * Normal pool object will be modified in dev mode.
 * Create and export a reference to the pool object so that the same export
 * can be used in dev or production mode
 */
let db = null;

if (process.env.NODE_ENV.includes('dev') && process.env.ENABLE_SQL_LOGGING === 'true') {
    /**
     * In dev mode, wrap pool to provide query logging.
     * Helps with debugging
     * 
     * Add timing info to help identify slow queries
     * Track number of rows affected by each query
     */
    db = {
        async query(text, params) {
            try {
                const start = Date.now();
                const res = await pool.query(text, params);
                const duration = Date.now() - start;
                console.log('Executed query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    duration: `${duration}ms`,
                    rows: res.rowCount
                });
                return res;
            } catch (error) {
                console.error('Error in query:', {
                    text: text.replace(/\s+/g, ' ').trim(),
                    error: error.message
                });
                throw error;
            }
        },

        async close() {
            await pool.end();
        }
    };
} else {
    // In production, export pool without logging overhead
    db = pool;
}

export default db;
export { caCert };