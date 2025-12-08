import pkg from 'pg';
const { Pool } = pkg;
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if we're using PostgreSQL (Railway) or SQLite (local)
const usePostgres = process.env.DATABASE_URL || process.env.PGHOST;

let pool;
let sqliteDb;
let dbType;

if (usePostgres) {
  // PostgreSQL for production (Railway)
  console.log('🐘 Using PostgreSQL database');
  dbType = 'postgres';

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
  });

  // Test connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('PostgreSQL connection error:', err);
    } else {
      console.log('✅ PostgreSQL connected successfully');
    }
  });
} else {
  // SQLite for local development
  console.log('📁 Using SQLite database (local development)');
  dbType = 'sqlite';
  sqliteDb = new Database(path.join(__dirname, 'database.sqlite'));
  sqliteDb.pragma('foreign_keys = ON');
}

// Database wrapper to provide consistent API
const db = {
  // Prepare statement (SQLite-style API)
  prepare(sql) {
    if (dbType === 'sqlite') {
      return sqliteDb.prepare(sql);
    } else {
      // Return a wrapper that mimics SQLite's prepared statement API
      return {
        async all(...params) {
          const result = await pool.query(sql.replace(/\?/g, (match, offset) => `$${params.length > 0 ? params.indexOf(params[offset]) + 1 : 1}`), params);
          return result.rows;
        },
        all(...params) {
          // Sync version - convert to promise
          return this.allAsync(...params);
        },
        async allAsync(...params) {
          // Convert ? placeholders to $1, $2, etc for PostgreSQL
          let paramIndex = 1;
          const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
          const result = await pool.query(pgSql, params);
          return result.rows;
        },
        async get(...params) {
          let paramIndex = 1;
          const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
          const result = await pool.query(pgSql, params);
          return result.rows[0];
        },
        async run(...params) {
          let paramIndex = 1;
          const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
          const result = await pool.query(pgSql, params);
          return {
            changes: result.rowCount,
            lastInsertRowid: result.rows[0]?.id
          };
        },
        run(...params) {
          // For synchronous-looking code, we need to handle this
          if (dbType === 'postgres') {
            // Return a thenable that allows await
            const promise = (async () => {
              let paramIndex = 1;
              const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);

              // For INSERT statements, append RETURNING id
              let finalSql = pgSql;
              if (pgSql.trim().toUpperCase().startsWith('INSERT')) {
                finalSql += ' RETURNING id';
              }

              const result = await pool.query(finalSql, params);
              return {
                changes: result.rowCount,
                lastInsertRowid: result.rows[0]?.id
              };
            })();

            // Make it thenable
            return {
              then: promise.then.bind(promise),
              catch: promise.catch.bind(promise)
            };
          }
        }
      };
    }
  },

  // Execute raw SQL
  async exec(sql) {
    if (dbType === 'sqlite') {
      return sqliteDb.exec(sql);
    } else {
      return await pool.query(sql);
    }
  },

  // Direct query method for PostgreSQL
  async query(sql, params = []) {
    if (dbType === 'postgres') {
      return await pool.query(sql, params);
    } else {
      // For SQLite, use exec
      return sqliteDb.exec(sql);
    }
  }
};

// Initialize database schema
async function initializeDatabase() {
  try {
    if (dbType === 'postgres') {
      // PostgreSQL schema
      await pool.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS videos (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          description TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS contact_info (
          id SERIAL PRIMARY KEY,
          type TEXT NOT NULL CHECK(type IN ('phone', 'email')),
          value TEXT NOT NULL,
          label TEXT,
          display_order INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ PostgreSQL database initialized successfully');
    } else {
      // SQLite schema
      sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS videos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          url TEXT NOT NULL,
          description TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS contact_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT NOT NULL CHECK(type IN ('phone', 'email')),
          value TEXT NOT NULL,
          label TEXT,
          display_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ SQLite database initialized successfully');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Initialize the database
await initializeDatabase();

// Export database with type info
export default db;
export { dbType };
