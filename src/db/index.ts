import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * The database is optional by design.
 *
 * When DATABASE_URL is unset — local dev without Neon, or a rollback — every
 * caller falls back to the static data in src/data/, so the public site keeps
 * rendering exactly as it did before the admin portal existed.
 */

export type Database = ReturnType<typeof drizzle<typeof schema>>;

let cached: Database | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Returns null (never throws) when the database isn't configured. */
export function getDb(): Database | null {
  if (!isDatabaseConfigured()) return null;
  if (cached) return cached;

  const sql = neon(process.env.DATABASE_URL!);
  cached = drizzle(sql, { schema });
  return cached;
}

/** For scripts and admin routes, where a missing database is a real error. */
export function requireDb(): Database {
  const db = getDb();
  if (!db) {
    throw new Error(
      'DATABASE_URL is not set. Add a Neon connection string to your environment.',
    );
  }
  return db;
}

export { schema };
