#!/usr/bin/env tsx
/**
 * Generate the bcrypt hash for ADMIN_PASSWORD_HASH.
 *
 *   npm run admin:hash -- 'your-password-here'
 *
 * The plaintext password is never stored anywhere — only the hash goes in env.
 */
import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run admin:hash -- 'your-password-here'");
  process.exit(1);
}

if (password.length < 12) {
  console.error('Use at least 12 characters — this is the only door to your admin portal.');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

console.log('\nVercel > Settings > Environment Variables — paste the value unquoted:\n');
console.log(`  ${hash}\n`);
console.log('For a local .env file, use this escaped form — bcrypt hashes contain "$",');
console.log('which dotenv expands and silently truncates otherwise:\n');
console.log(`ADMIN_PASSWORD_HASH="${hash.replace(/\$/g, '\\$')}"\n`);
