/**
 * Admin portal gating.
 *
 * The portal is fully inert unless all three secrets are present. This is what
 * guarantees a misconfigured deploy can't expose an unprotected admin surface —
 * there is no default password and no fallback user.
 */

/** Every bcrypt hash starts with one of these. */
const BCRYPT_PREFIX = /^\$2[aby]\$\d{2}\$/;

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH,
  );
}

/**
 * Guards against a silently corrupted hash.
 *
 * bcrypt hashes contain "$", which dotenv treats as variable expansion — an
 * unescaped hash in a .env file arrives truncated and every login just fails
 * with "incorrect password". Surfacing it here turns an hour of confusion into
 * a one-line fix. (Vercel dashboard variables are unaffected.)
 */
export function adminHashProblem(): string | null {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return null;
  if (BCRYPT_PREFIX.test(hash)) return null;

  return (
    'ADMIN_PASSWORD_HASH does not look like a bcrypt hash (it should start with "$2b$12$"). ' +
    'In a .env file the "$" characters must be escaped as \\$ — otherwise dotenv expands them ' +
    'and the hash arrives truncated. Values set in the Vercel dashboard need no escaping.'
  );
}

/** Host that serves the portal in production. */
export function adminHost(): string {
  return process.env.ADMIN_HOST ?? 'admin.dimaac.com';
}

/**
 * True only when the request arrived on the admin hostname.
 *
 * Deliberately strict: treating localhost as the admin host would turn the
 * whole local dev site into the portal. Locally you reach the portal at
 * /admin instead (see the dev allowance in middleware).
 */
export function isAdminRequestHost(host: string | null): boolean {
  if (!host) return false;
  const hostname = host.split(':')[0]!.toLowerCase();
  return hostname === adminHost().toLowerCase();
}
