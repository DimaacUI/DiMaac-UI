#!/usr/bin/env tsx
/**
 * Import the static template catalog + sidebar into Postgres.
 *
 *   npm run db:seed
 *
 * Safe to re-run: rows are matched by slug and updated in place.
 */
import 'dotenv/config';
import { seedTemplates } from '../src/lib/templates/seed';
import { isBlobConfigured } from '../src/lib/blob';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Copy .env.example to .env and add your Neon URL.');
    process.exit(1);
  }

  console.log('Seeding database…');
  console.log(`  Blob storage: ${isBlobConfigured() ? 'configured' : 'not configured (zips stay on disk)'}`);

  const result = await seedTemplates();

  console.log('\nDone.');
  console.log(`  Templates inserted: ${result.templatesInserted}`);
  console.log(`  Templates updated:  ${result.templatesUpdated}`);
  console.log(`  Zips uploaded:      ${result.zipsUploaded}`);
  console.log(`  Nav sections:       ${result.navSectionsCreated}`);
  console.log(`  Nav items:          ${result.navItemsCreated}`);

  if (result.zipsSkipped.length > 0) {
    console.log(
      `\n  Zips not found locally (will still serve from disk if present on the server):\n    ${result.zipsSkipped.join(', ')}`,
    );
  }
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
