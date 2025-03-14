import pool from "../../config/db";
import fs from "fs";
import path from "path";

async function seed() {
  try {
    // Ensure the seeds table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS seeds (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Get list of already applied seeds
    const { rows: appliedSeeds } = await pool.query(
      "SELECT filename FROM seeds"
    );
    const appliedFiles = appliedSeeds.map((row) => row.filename);

    // Read all seed files
    const seedFiles = fs.readdirSync(path.join(__dirname, "../seeds")).sort();

    for (const file of seedFiles) {
      if (appliedFiles.includes(file)) {
        console.log(`⚡ Skipping already applied seed: ${file}`);
        continue; // Skip if already applied
      }

      // Read and run the seed
      const sql = fs.readFileSync(
        path.join(__dirname, `../seeds/${file}`),
        "utf-8"
      );
      await pool.query(sql);

      // Insert into seeds table to track it
      await pool.query("INSERT INTO seeds (filename) VALUES ($1)", [file]);

      console.log(`✅ Applied seed: ${file}`);
    }
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seed();
