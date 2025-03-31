import pool from '../config/db';
import fs from 'fs';
import path from 'path';

async function migrate() {
  try {
    // Ensure the migrations table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Get list of already applied migrations
    const { rows: appliedMigrations } = await pool.query(
      'SELECT filename FROM migrations'
    );
    const appliedFiles = appliedMigrations.map((row) => row.filename);

    // Read all migration files
    const migrationFiles = fs
      .readdirSync(path.join(__dirname, '../database/migrations'))
      .sort();

    for (const file of migrationFiles) {
      if (appliedFiles.includes(file)) {
        console.log(`⚡ Skipping already applied migration: ${file}`);
        continue; // Skip if already applied
      }

      // Read and run the migration
      const sql = fs.readFileSync(
        path.join(__dirname, `../database/migrations/${file}`),
        'utf-8'
      );
      await pool.query(sql);

      // Insert into migrations table to track it
      await pool.query('INSERT INTO migrations (filename) VALUES ($1)', [file]);

      console.log(`✅ Applied migration: ${file}`);
    }
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    pool.end();
  }
}

migrate();
